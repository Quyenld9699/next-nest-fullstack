import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ErrorAcountNotActive, ErrorUnauthorized } from 'src/constants/error';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new ErrorUnauthorized();
        }
        if (user.isActive == false) {
            throw new ErrorAcountNotActive();
        }
        return user;
    }
}
