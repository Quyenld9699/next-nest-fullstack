import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsNotEmpty } from 'class-validator';
import { UserRoles } from 'src/constants';

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Name is required! :))' })
    name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Email is required! :))' })
    @IsEmail({}, { message: 'Email is invalid! :))' })
    email: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Password is required! :))' })
    password: string;
}
