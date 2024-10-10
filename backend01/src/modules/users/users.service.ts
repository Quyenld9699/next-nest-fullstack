import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { hashPassword } from 'src/helpers/utils';
import apq from 'api-query-params';
import { CodeVerifyEmailDto, CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { MailerService } from '@nestjs-modules/mailer';
import { ErrorEmailRegisterExist, ErrorExpiredToken } from 'src/constants/error';
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        private readonly mailerService: MailerService
    ) {}

    async isEmailExist(email: string) {
        const user = await this.userModel.exists({ email });
        if (user) {
            return true;
        }
        return false;
    }

    async create(createUserDto: CreateUserDto) {
        const hashPass = await hashPassword(createUserDto.password);
        // TODO: check email exist
        if (await this.isEmailExist(createUserDto.email)) {
            throw new ErrorEmailRegisterExist();
        }

        // TODO: hash password
        const newUser = await this.userModel.create({
            ...createUserDto,
            password: hashPass,
        });
        return newUser;
    }

    async register(authRegisterData: CreateAuthDto) {
        const hashPass = await hashPassword(authRegisterData.password);
        // TODO: check email exist
        if (await this.isEmailExist(authRegisterData.email)) {
            throw new ErrorEmailRegisterExist();
        }

        const codeId = uuidv4();
        // TODO: hash password
        const newUser = await this.userModel.create({
            ...authRegisterData,
            password: hashPass,
            isActive: false,
            codeId: codeId,
            codeExpired: dayjs().add(1, 'minutes').toDate(),
        });

        this.mailerService
            .sendMail({
                to: newUser.email,
                subject: 'Activate your account',
                template: 'register',
                context: {
                    name: newUser.name || newUser.email,
                    activationCode: codeId,
                },
            })
            .then(() => {})
            .catch((e) => {
                console.log('co loi roi', e);
            });

        return newUser;
    }

    async findAll(query: string, pageCurrent: number, pageSize: number) {
        const { filter, sort } = apq(query);

        if (filter.pageCurrent) delete filter.pageCurrent;
        if (filter.pageSize) delete filter.pageSize;

        if (!pageSize) pageSize = 10;
        if (!pageCurrent) pageCurrent = 1;

        const skip = (pageCurrent - 1) * pageSize;
        const totalItems = await this.userModel.countDocuments();
        const totalPages = Math.ceil(totalItems / pageSize);

        const result = await this.userModel
            .find(filter)
            .skip(skip)
            .limit(pageSize)
            .select('-password')
            .sort(sort as any);
        return { result, totalPages };
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    async findbyEmail(email: string) {
        return await this.userModel.findOne({ email });
    }

    async update(updateUserDto: UpdateUserDto) {
        return this.userModel.updateOne({ _id: updateUserDto._id }, updateUserDto);
    }

    remove(id: string) {
        // TODO: check id
        if (mongoose.isValidObjectId(id)) {
            return this.userModel.deleteOne({ _id: id });
        } else {
            throw new BadRequestException('Invalid ID');
        }
    }

    async verifyEmail(body: CodeVerifyEmailDto) {
        const user = await this.userModel.findOne({ _id: body.id, codeId: body.code });

        if (!user) {
            throw new BadRequestException('Invalid code!');
        }
        // check expired
        if (dayjs(user.codeExpired).isBefore(dayjs())) {
            throw new ErrorExpiredToken();
        }

        await this.userModel.updateOne({ _id: user._id }, { isActive: true });
        return { message: 'Verify success!' };
    }

    async resendVerifyEmail(data: { email: string }) {
        const user = await this.userModel.findOne({ email: data.email });
        if (!user) {
            throw new BadRequestException('Email not exist!');
        }
        if (user.isActive) {
            throw new BadRequestException('Email is actived!');
        }

        const codeId = uuidv4();
        await user.updateOne({ codeId, codeExpired: dayjs().add(4, 'minutes').toDate() });

        this.mailerService
            .sendMail({
                to: user.email,
                subject: 'Activate your account',
                template: 'register',
                context: {
                    name: user.name || user.email,
                    activationCode: codeId,
                },
            })
            .then(() => {})
            .catch((e) => {
                console.log('co loi roi', e);
            });
        return { id: user._id, email: user.email };
    }
}
