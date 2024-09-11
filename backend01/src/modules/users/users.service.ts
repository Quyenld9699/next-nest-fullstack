import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
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

    async findAll(query: string) {
        return `This action returns all users`;
    }

    findOne(id: number) {
        return `This action returns a #${id} user`;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
