import { IsBoolean, IsString } from '@infinity-js/core';

export class PhoneNumberData {
  @IsString()
  ddd!: string;
  @IsString()
  ddi!: string;
  @IsString()
  number!: string;
  @IsBoolean()
  isVerified!: boolean;
}
