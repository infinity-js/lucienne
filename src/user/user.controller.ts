import { ApiTags } from '@infinity-js/core';
import { Body, Controller, Post } from '@nestjs/common';
import {
  CreateUserRestDocumentation,
  CreateUserRestService,
  CreateUserRestServiceParamsDTO,
} from './rest-services/create.rest-service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly createRestService: CreateUserRestService) {}

  @Post()
  @CreateUserRestDocumentation()
  create(@Body() body: CreateUserRestServiceParamsDTO) {
    return this.createRestService.execute(body);
  }
}
