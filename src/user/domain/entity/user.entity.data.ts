import {
  IsDateString,
  IsObject,
  IsString,
  OmitType,
  Type,
  ValidateNested,
} from '@infinity-js/core';
import { CreateUserPhoneNumberDTO, UserPhoneNumberData } from './value-objects';

export class UserData {
  @IsString()
  id!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @Type(() => UserPhoneNumberData)
  @ValidateNested()
  @IsObject()
  phoneNumber!: UserPhoneNumberData;

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
  'phoneNumber',
] as const) {
  phoneNumber!: CreateUserPhoneNumberDTO;
}
