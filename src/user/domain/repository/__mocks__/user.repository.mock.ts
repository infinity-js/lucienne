import { User } from '../../entity/user.entity';

export class UserRepositoryServiceMock {
  async create(): Promise<void> {
    return Promise.resolve();
  }

  async findOneByPhoneNumber(): Promise<User | undefined> {
    return undefined;
  }
}
