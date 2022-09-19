import { BaseRepository } from '@infinity-js/core';
import { Prisma } from '@prisma/client';
import { User } from '../entity/user.entity';
import { UserPhoneNumberData } from '../entity/value-objects';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UserRepository {
  export type FindUniqueArgs = Prisma.UserFindUniqueArgs;
  export type FindMany = Prisma.UserFindManyArgs;
}

export interface UserRepository
  extends BaseRepository<
    User,
    UserRepository.FindUniqueArgs,
    UserRepository.FindMany
  > {
  findOneByPhoneNumber(
    phoneNumber: UserPhoneNumberData,
  ): Promise<User | undefined>;
}
