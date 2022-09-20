import {
  IsDateString,
  IsObject,
  IsString,
  OmitType,
  Type,
  ValidateNested,
} from '@infinity-js/core';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserPhoneNumberDTO, UserPhoneNumberData } from './value-objects';

export class UserData {
  @ApiProperty({
    description: 'The user id',
    example: '5f9f1b9f-7c5e-4b9f-8c5e-7c5f9f1b9f1b',
    type: String,
  })
  @IsString()
  id!: string;

  @ApiProperty({
    description: 'The user first name',
    example: 'John',
    type: String,
  })
  @IsString()
  firstName!: string;

  @ApiProperty({
    description: 'The user last name',
    example: 'Doe',
    type: String,
  })
  @IsString()
  lastName!: string;

  @ApiProperty({
    description: 'The user phone number',
    type: UserPhoneNumberData,
  })
  @Type(() => UserPhoneNumberData)
  @ValidateNested()
  @IsObject()
  phoneNumber!: UserPhoneNumberData;

  @ApiProperty({
    description: 'The user password hash',
    example: 'tHeUsErPaSsWoRdHaSh',
    type: String,
  })
  @IsString()
  password!: string;

  @ApiProperty({
    description: 'The user created at date',
    example: new Date().toISOString(),
    type: String,
  })
  @IsDateString()
  createdAt!: string;

  @ApiProperty({
    description: 'The user updated at date',
    example: new Date().toISOString(),
    type: String,
  })
  @IsDateString()
  updatedAt!: string;
}

export class CreateUserDTO extends OmitType(UserData, [
  'id',
  'createdAt',
  'updatedAt',
  'phoneNumber',
] as const) {
  phoneNumber!: CreateUserPhoneNumberDTO;
}
