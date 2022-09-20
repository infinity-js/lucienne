import { Injectable } from '@nestjs/common';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserData } from '../domain/entity/user.entity.data';
import { UserService } from '../user.service';
import {} from '@nestjs/swagger';
import { CreateUserPhoneNumberDTO } from '../domain/entity/value-objects';
import { IsObject, Type, ValidateNested } from '@infinity-js/core';

export class CreateUserRestServiceParamsDTO extends PickType(UserData, [
  'firstName',
  'lastName',
  'password',
] as const) {
  @ApiProperty({
    description: 'The user password',
    example: '12345678',
    type: String,
  })
  password!: string;

  @Type(() => CreateUserPhoneNumberDTO)
  @ValidateNested()
  @IsObject()
  @ApiProperty({
    type: CreateUserPhoneNumberDTO,
  })
  phoneNumber!: CreateUserPhoneNumberDTO;
}

type Params = CreateUserRestServiceParamsDTO;

@Injectable()
export class CreateUserRestService {
  constructor(private readonly userService: UserService) {}

  async execute(params: Params) {
    await this.userService.create({
      data: params,
    });
  }
}
