import { Injectable } from '@nestjs/common';
import { Prisma, User as PrismaUser, User_Phone_Number } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { User } from 'src/user/domain/entity/user.entity';
import { UserRepository } from 'src/user/domain/repository/user.repository';

@Injectable()
export class UserRepositoryService implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: User): Promise<void> {
    await this.prisma.user.create({
      data: {
        id: entity.id,
        firstName: entity.firstName,
        lastName: entity.lastName,
        password: entity.password,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        User_Phone_Number: {
          create: {
            ddd: entity.phoneNumber.ddd,
            ddi: entity.phoneNumber.ddi,
            number: entity.phoneNumber.number,
            isVerified: entity.phoneNumber.isVerified,
          },
        },
      },
    });
  }
  async update(entity: User): Promise<void> {
    await this.prisma.user.update({
      where: {
        id: entity.id,
      },
      data: {
        firstName: entity.firstName,
        lastName: entity.lastName,
        password: entity.password,
        updatedAt: entity.updatedAt,
        createdAt: entity.createdAt,
        User_Phone_Number: {
          update: {
            ddd: entity.phoneNumber.ddd,
            ddi: entity.phoneNumber.ddi,
            number: entity.phoneNumber.number,
            isVerified: entity.phoneNumber.isVerified,
          },
        },
      },
    });
  }
  async findOne(findOne: Prisma.UserFindUniqueArgs): Promise<User | undefined> {
    const prismaUser = await this.prisma.user.findUnique({
      ...findOne,
      include: {
        User_Phone_Number: true,
      },
    });
    return prismaUser ? this.prismaUserToUserEntity(prismaUser) : undefined;
  }

  async findMany(findMany: Prisma.UserFindManyArgs): Promise<User[]> {
    const prismaUsers = await this.prisma.user.findMany({
      ...findMany,
      include: {
        User_Phone_Number: true,
      },
    });

    return prismaUsers.map((prismaUser) =>
      this.prismaUserToUserEntity(prismaUser),
    );
  }

  private prismaUserToUserEntity(
    prismaUser: PrismaUser & {
      User_Phone_Number: User_Phone_Number | null;
    },
  ): User {
    if (!prismaUser.User_Phone_Number) {
      throw new Error('User_Phone_Number is null');
    }

    return User.instantiate({
      id: prismaUser.id,
      firstName: prismaUser.firstName,
      lastName: prismaUser.lastName,
      password: prismaUser.password,
      createdAt: prismaUser.createdAt.toISOString(),
      updatedAt: prismaUser.updatedAt.toISOString(),
      phoneNumber: {
        ddd: prismaUser.User_Phone_Number.ddd,
        ddi: prismaUser.User_Phone_Number.ddi,
        isVerified: prismaUser.User_Phone_Number.isVerified,
        number: prismaUser.User_Phone_Number.number,
      },
    });
  }
}
