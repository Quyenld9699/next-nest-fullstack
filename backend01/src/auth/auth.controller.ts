import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CodeVerifyEmailDto, CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';
import { Public } from 'src/decorator';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly mailerService: MailerService
    ) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('login')
    signIn(@Request() req) {
        return this.authService.login(req.user);
    }

    // @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Post('register')
    @Public()
    register(@Body() createAuthDto: CreateAuthDto) {
        return this.authService.register(createAuthDto);
    }

    @Post('verify-email')
    @Public()
    verifyEmail(@Body() body: CodeVerifyEmailDto) {
        return this.authService.verifyEmail(body);
    }

    @Post('resend-verify-email')
    @Public()
    resendVerifyEmail(@Body() body: { email: string }) {
        return this.authService.resendVerifyEmail(body);
    }

    @Get('mail')
    @Public()
    async sendMail() {
        this.mailerService
            .sendMail({
                to: 'quyenld9699@gmail.com',
                subject: 'Testing Nest MailerModule ✔',
                text: 'Welcome to my app',
                html: 'register.hbs',
                context: {
                    name: 'Quyen',
                    activationCode: 67878234,
                },
            })
            .then(() => {})
            .catch((e) => {
                console.log('co loi roi', e);
            });
        return 'OK';
    }
}
