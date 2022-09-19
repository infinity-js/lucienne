import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, User as PrismaUser, User_Phone_Number } from '@prisma/client';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { makeFakeUserEntity } from 'test/unit/user/domain/user.entity.spec';
import { UserRepositoryService } from 'src/user/infra/repository/user.repository.service';

const mockPrisma = {
  user: {
    create: jest.fn(),
    update: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
  },
  user_Phone_Number: {
    findUnique: jest.fn(),
  },
};

const userEntity = makeFakeUserEntity();

const prismaUser: PrismaUser = {
  id: userEntity.id,
  firstName: userEntity.firstName,
  lastName: userEntity.lastName,
  password: userEntity.password,
  updatedAt: userEntity.updatedAt,
  createdAt: userEntity.createdAt,
};

const prismaUserPhoneNumber: User_Phone_Number = {
  userId: userEntity.id,
  ddd: userEntity.phoneNumber.ddd,
  ddi: userEntity.phoneNumber.ddi,
  number: userEntity.phoneNumber.number,
  isVerified: userEntity.phoneNumber.isVerified,
};

describe('UserRepositoryService', () => {
  let service: UserRepositoryService;
  const fakeUserReturn = {
    ...prismaUser,
    User_Phone_Number: prismaUserPhoneNumber,
  };
  const fakeUserByPhoneReturn = {
    ...prismaUserPhoneNumber,
    User: prismaUser,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRepositoryService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrisma)
      .compile();

    service = module.get<UserRepositoryService>(UserRepositoryService);

    mockPrisma.user.findUnique.mockResolvedValue(fakeUserReturn);
    mockPrisma.user.findMany.mockResolvedValue([fakeUserReturn]);
    mockPrisma.user_Phone_Number.findUnique.mockResolvedValue(
      fakeUserByPhoneReturn,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call prisma.create with params', async () => {
    const params: Prisma.UserCreateArgs = {
      data: {
        id: userEntity.id,
        firstName: userEntity.firstName,
        lastName: userEntity.lastName,
        password: userEntity.password,
        createdAt: userEntity.createdAt,
        updatedAt: userEntity.updatedAt,
        User_Phone_Number: {
          create: {
            ddd: userEntity.phoneNumber.ddd,
            ddi: userEntity.phoneNumber.ddi,
            number: userEntity.phoneNumber.number,
            isVerified: userEntity.phoneNumber.isVerified,
          },
        },
      },
    };
    await service.create(userEntity);
    expect(mockPrisma.user.create).toBeCalledWith(params);
  });

  it('should call prisma.update with params', async () => {
    const params: Prisma.UserUpdateArgs = {
      where: {
        id: userEntity.id,
      },
      data: {
        firstName: userEntity.firstName,
        lastName: userEntity.lastName,
        password: userEntity.password,
        createdAt: userEntity.createdAt,
        updatedAt: userEntity.updatedAt,
        User_Phone_Number: {
          update: {
            ddd: userEntity.phoneNumber.ddd,
            ddi: userEntity.phoneNumber.ddi,
            number: userEntity.phoneNumber.number,
            isVerified: userEntity.phoneNumber.isVerified,
          },
        },
      },
    };

    await service.update(userEntity);
    expect(mockPrisma.user.update).toBeCalledWith(params);
  });

  describe('should call prisma.findUnique with params', () => {
    it('at findOne method', async () => {
      const params: Prisma.UserFindUniqueArgs = {
        where: {
          id: userEntity.id,
        },
      };

      await service.findOne(params);
      expect(mockPrisma.user.findUnique).toBeCalledWith({
        ...params,
        include: {
          User_Phone_Number: true,
        },
      });
    });

    it('at findOneByPhoneNumber method', async () => {
      const params: Prisma.User_Phone_NumberFindUniqueArgs = {
        where: {
          ddi_ddd_number: {
            ddd: userEntity.phoneNumber.ddd,
            ddi: userEntity.phoneNumber.ddi,
            number: userEntity.phoneNumber.number,
          },
        },
      };

      await service.findOneByPhoneNumber({
        ddd: userEntity.phoneNumber.ddd,
        ddi: userEntity.phoneNumber.ddi,
        number: userEntity.phoneNumber.number,
      });

      expect(mockPrisma.user_Phone_Number.findUnique).toBeCalledWith({
        ...params,
        include: {
          User: true,
        },
      });
    });
  });

  it('should call prisma.findMany with params', async () => {
    const params: Prisma.UserFindManyArgs = {
      where: {
        id: userEntity.id,
      },
    };

    await service.findMany(params);
    expect(mockPrisma.user.findMany).toBeCalledWith({
      ...params,
      include: {
        User_Phone_Number: true,
      },
    });
  });

  describe("should return undefined if user doesn't exist", () => {
    it('at findOne method', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      const user = await service.findOne({ where: { id: userEntity.id } });
      expect(user).toBeUndefined();
    });

    it('at findOneByPhoneNumber method', async () => {
      mockPrisma.user_Phone_Number.findUnique.mockResolvedValue(null);
      const user = await service.findOneByPhoneNumber({
        ddd: userEntity.phoneNumber.ddd,
        ddi: userEntity.phoneNumber.ddi,
        number: userEntity.phoneNumber.number,
      });
      expect(user).toBeUndefined();
    });
  });

  describe("should throw an error if user phone number doesn't exist", () => {
    it('at findOne method', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        ...prismaUser,
        User_Phone_Number: null,
      });
      await expect(
        service.findOne({ where: { id: userEntity.id } }),
      ).rejects.toThrowError("User doesn't have a phone number");
    });

    it('at findOneByPhoneNumber method', async () => {
      mockPrisma.user_Phone_Number.findUnique.mockResolvedValue({
        ...prismaUserPhoneNumber,
        User: null,
      });
      await expect(
        service.findOneByPhoneNumber({
          ddd: userEntity.phoneNumber.ddd,
          ddi: userEntity.phoneNumber.ddi,
          number: userEntity.phoneNumber.number,
        }),
      ).rejects.toThrowError("Phone number doesn't have a user");
    });
  });
});
