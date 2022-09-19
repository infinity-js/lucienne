import { AlreadyExistsException } from '@infinity-js/core';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/domain/entity/user.entity';
import { CreateUserDTO } from 'src/user/domain/entity/user.entity.data';
import { UserRepositoryService } from 'src/user/infra/repository/user.repository.service';

export type CreateUserServiceParamsDTO = {
  data: CreateUserDTO;
};

export type CreateUserServiceResponseDTO = {
  user: User;
};

type Params = CreateUserServiceParamsDTO;
type Response = CreateUserServiceResponseDTO;
@Injectable()
export class CreateUserService {
  constructor(private readonly userRepositoryService: UserRepositoryService) {}

  async execute(params: Params): Promise<Response> {
    const userExists = await this.userRepositoryService.findOneByPhoneNumber(
      params.data.phoneNumber,
    );

    if (userExists) {
      throw new AlreadyExistsException({
        message: 'User already exists',
        portugueseMessage: 'Usuário já existe',
      });
    }

    // TODO: Encriptar a senha antes de guardar no banco usando o bcrypt
    // Salvar todos os dados no banco e retornar o usuário criado
  }
}
