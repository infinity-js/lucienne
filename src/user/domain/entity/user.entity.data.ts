import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsObject,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { PhoneNumber } from './value-objects';

export class UserData {
  @IsUUID()
  id!: string;

  @IsString()
  name!: string;

  @Type(() => PhoneNumber)
  @ValidateNested()
  @IsObject()
  phoneNumber!: PhoneNumber;

  @IsString()
  password!: string;

  @IsString()
  @IsDateString()
  createdAt!: string;

  @IsString()
  @IsDateString()
  updatedAt!: string;
}

export class CreateUserDTO extends OmitType(UserData, [
  'id',
  'createdAt',
  'updatedAt',
] as const) {}
