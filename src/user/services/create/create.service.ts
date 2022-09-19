import { AlreadyExistsException } from '@infinity-js/core';
import { Injectable } from '@nestjs/common';
import { HashingService } from 'src/common/hashing/hashing.service';
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
  constructor(
    private readonly userRepositoryService: UserRepositoryService,
    private readonly hashingService: HashingService,
  ) {}

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

    const hashedPassword = await this.hashingService.hash(params.data.password);

    const user = User.create({
      firstName: params.data.firstName,
      lastName: params.data.lastName,
      password: hashedPassword,
      phoneNumber: params.data.phoneNumber,
    });

    await this.userRepositoryService.create(user);

    return {
      user,
    };
  }
}
