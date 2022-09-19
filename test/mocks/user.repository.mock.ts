import { Prisma } from '@prisma/client';
import { User } from 'src/user/domain/entity/user.entity';
import { UserPhoneNumberData } from 'src/user/domain/entity/value-objects';
import { UserRepository } from 'src/user/domain/repository/user.repository';

export class UserRepositoryServiceMock implements UserRepository {
  database: User[] = [];

  async create(entity: User): Promise<void> {
    this.database.push(entity);
  }
  async update(entity: User): Promise<void> {
    const index = this.database.findIndex((user) => user.id === entity.id);

    this.database[index] = entity;
  }
  async findOne(findOne: Prisma.UserFindUniqueArgs): Promise<User | undefined> {
    const findById = findOne.where.id;

    if (findById) {
      return this.database.find((user) => user.id === findById);
    }

    return undefined;
  }

  async findOneByPhoneNumber(
    phoneNumber: UserPhoneNumberData,
  ): Promise<User | undefined> {
    return this.database.find(
      (user) =>
        user.phoneNumber.ddd === phoneNumber.ddd &&
        user.phoneNumber.ddi === phoneNumber.ddi &&
        user.phoneNumber.number === phoneNumber.number,
    );
  }
  async findMany(findMany: Prisma.UserFindManyArgs): Promise<User[]> {
    const where = findMany.where;

    if (where) {
      return this.database.filter((user) => user.id === where.id);
    }

    return this.database;
  }
}
