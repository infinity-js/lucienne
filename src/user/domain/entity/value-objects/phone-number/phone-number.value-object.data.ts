import { IsBoolean, IsString } from 'class-validator';

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
