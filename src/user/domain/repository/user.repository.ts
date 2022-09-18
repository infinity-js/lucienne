import { BaseRepository } from '@infinity-js/core';
import { Prisma } from '@prisma/client';
import { User } from '../entity/user.entity';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UserRepository {
  export type FindUniqueArgs = Prisma.UserFindUniqueArgs;
  export type FindMany = Prisma.UserFindManyArgs;
}

export type UserRepository = BaseRepository<
  User,
  UserRepository.FindUniqueArgs,
  UserRepository.FindMany
>;
