import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAuthDto {
    @IsNotEmpty({ message: 'Email is required' })
    email: string;
    @IsNotEmpty({ message: 'Password is required' })
    password: string;

    @IsOptional()
    name: string;
}

export class CodeVerifyEmailDto {
    @IsNotEmpty({ message: 'Code is required' })
    code: string;

    @IsNotEmpty({ message: 'ID is required' })
    id: string;
}
