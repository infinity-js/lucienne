import { IsBoolean, IsString } from '@infinity-js/core';
import { ApiProperty, OmitType } from '@nestjs/swagger';

export class UserPhoneNumberData {
  @ApiProperty({
    description: 'The phone number ddi',
    example: '55',
    type: String,
  })
  @IsString()
  ddi!: string;
  @ApiProperty({
    description: 'The phone number ddd',
    example: '11',
    type: String,
  })
  @IsString()
  ddd!: string;

  @ApiProperty({
    description: 'The phone number number',
    example: '999999999',
    type: String,
  })
  @IsString()
  number!: string;

  @ApiProperty({
    description: 'The phone number is verified',
    example: false,
    type: Boolean,
  })
  @IsBoolean()
  isVerified!: boolean;
}

export class CreateUserPhoneNumberDTO extends OmitType(UserPhoneNumberData, [
  'isVerified',
]) {}
