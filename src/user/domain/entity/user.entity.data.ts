import {
  IsDateString,
  IsObject,
  IsString,
  OmitType,
  Type,
  ValidateNested,
} from '@infinity-js/core';
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
