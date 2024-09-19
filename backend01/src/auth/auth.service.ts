import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import { comparePassword } from 'src/helpers/utils';
import { JwtService } from '@nestjs/jwt';

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
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
