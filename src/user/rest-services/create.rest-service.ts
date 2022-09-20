import { applyDecorators, Injectable } from '@nestjs/common';
import { UserData } from '../domain/entity/user.entity.data';
import { UserService } from '../user.service';
import { CreateUserPhoneNumberDTO } from '../domain/entity/value-objects';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiProperty,
  HttpExceptionContract,
  IsObject,
  PickType,
  Type,
  ValidateNested,
} from '@infinity-js/core';

export const CreateUserRestDocumentation = () =>
  applyDecorators(
    ApiCreatedResponse({
      description: 'The user has been successfully created',
    }),
    ApiBadRequestResponse({
      type: HttpExceptionContract,
      description: 'Validation error or User already exists',
    }),
    ApiInternalServerErrorResponse({
      type: HttpExceptionContract,
      description: 'Internal server error',
    }),
  );
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
