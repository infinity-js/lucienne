import { InternalException } from '@infinity-js/core';
import { Injectable } from '@nestjs/common';
import { Prisma, User as PrismaUser, User_Phone_Number } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { User } from 'src/user/domain/entity/user.entity';
import { CreateUserPhoneNumberDTO } from 'src/user/domain/entity/value-objects';
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

  async findOneByPhoneNumber(
    phoneNumber: CreateUserPhoneNumberDTO,
  ): Promise<User | undefined> {
    const foundPhoneNumber = await this.prisma.user_Phone_Number.findUnique({
      where: {
        ddi_ddd_number: {
          ddd: phoneNumber.ddd,
          ddi: phoneNumber.ddi,
          number: phoneNumber.number,
        },
      },
      include: {
        User: true,
      },
    });

    return foundPhoneNumber
      ? this.phoneNumberToUser(foundPhoneNumber)
      : undefined;
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
      throw new InternalException({
        message: "User doesn't have a phone number",
        portugueseMessage: 'Usu??rio n??o possui um n??mero de telefone',
      });
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

  phoneNumberToUser(
    params: User_Phone_Number & {
      User: PrismaUser | null;
    },
  ) {
    if (!params.User) {
      throw new InternalException({
        message: "Phone number doesn't have a user",
        portugueseMessage: 'N??mero de telefone n??o possui um usu??rio',
      });
    }

    return User.instantiate({
      id: params.User.id,
      firstName: params.User.firstName,
      lastName: params.User.lastName,
      password: params.User.password,
      createdAt: params.User.createdAt.toISOString(),
      updatedAt: params.User.updatedAt.toISOString(),
      phoneNumber: {
        ddd: params.ddd,
        ddi: params.ddi,
        isVerified: params.isVerified,
        number: params.number,
      },
    });
  }
}
