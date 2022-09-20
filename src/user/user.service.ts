import { Injectable } from '@nestjs/common';
import {
  CreateUserService,
  CreateUserServiceParamsDTO,
  CreateUserServiceResponseDTO,
} from './services/create.service';

@Injectable()
export class UserService {
  constructor(private readonly createUserService: CreateUserService) {}

  async create(
    params: CreateUserServiceParamsDTO,
  ): Promise<CreateUserServiceResponseDTO> {
    return this.createUserService.execute(params);
  }
}
