import { IsBoolean, IsString, OmitType } from '@infinity-js/core';

export class UserPhoneNumberData {
  @IsString()
  ddd!: string;
  @IsString()
  ddi!: string;
  @IsString()
  number!: string;
  @IsBoolean()
  isVerified!: boolean;
}

export class CreateUserPhoneNumberDTO extends OmitType(UserPhoneNumberData, [
  'isVerified',
]) {}
