import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ required: true })
    @IsMongoId({ message: 'Invalid ID' })
    @IsNotEmpty({ message: 'ID is required' })
    _id: string;

    @ApiProperty({ required: false, default: 'name test' })
    @IsOptional()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    email: string;

    @ApiProperty()
    @IsOptional()
    phone: string;

    @ApiProperty()
    @IsOptional()
    address: string;

    @ApiProperty()
    @IsOptional()
    images: string;
}
