import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateUserRestService,
  CreateUserRestServiceParamsDTO,
} from './rest-services/create.rest-service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private readonly createRestService: CreateUserRestService) {}

  @Post()
  async create(@Body() body: CreateUserRestServiceParamsDTO) {
    return this.createRestService.execute(body);
  }
}
