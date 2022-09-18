import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PhoneNumberData } from './value-objects';

export class UserData {
  @IsString()
  id!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @Type(() => PhoneNumberData)
  @ValidateNested()
  @IsObject()
  phoneNumber!: PhoneNumberData;

  @IsString()
  password!: string;

  @IsDateString()
  createdAt!: string;

  @IsDateString()
  updatedAt!: string;
}

export class CreateUserDTO extends OmitType(UserData, [
  'id',
  'createdAt',
  'updatedAt',
] as const) {}
