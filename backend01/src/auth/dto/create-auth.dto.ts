import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @ApiProperty()
    @IsOptional()
    name: string;
}

export class CodeVerifyEmailDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Code is required' })
    code: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'ID is required' })
    id: string;
}

export class ResendVerifyEmailDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Email is required' })
    email: string;
}

export class LoginDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Email is required' })
    username: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}
