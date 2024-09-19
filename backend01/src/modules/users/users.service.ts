import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { hashPassword } from 'src/helpers/utils';
import apq from 'api-query-params';
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

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
            throw new BadRequestException('Email is already exist');
        }

        // TODO: hash password
        const newUser = await this.userModel.create({
            ...createUserDto,
            password: hashPass,
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
}
