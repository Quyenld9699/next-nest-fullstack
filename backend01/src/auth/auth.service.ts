import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { comparePassword } from 'src/helpers/utils';
import { JwtService } from '@nestjs/jwt';
import { CodeVerifyEmailDto, CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(email: string, password: string): Promise<any> {
        const user = await this.userService.findbyEmail(email);
        if (!user) {
            throw new UnauthorizedException('Email is not exist');
        }
        if (!(await comparePassword(password, user.password))) {
            throw new UnauthorizedException('Password is not correct');
        }

        const payload = {
            sub: user._id,
            username: user.email,
        };
        return {
            user: { id: user._id, email: user.email, role: user.role, name: user.name },
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findbyEmail(username);
        if (!user) {
            return null;
        }
        if (!(await comparePassword(password, user.password))) {
            return null;
        }
        return user;
    }
    async login(user: any) {
        const payload = { username: user.email, sub: user._id };
        return {
            user: { id: user._id, email: user.email, role: user.role, name: user.name },
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(createAuthDto: CreateAuthDto) {
        return this.userService.register(createAuthDto);
    }

    async verifyEmail(data: CodeVerifyEmailDto) {
        return this.userService.verifyEmail(data);
    }

    async resendVerifyEmail(data: { email: string }) {
        return this.userService.resendVerifyEmail(data);
    }
}
