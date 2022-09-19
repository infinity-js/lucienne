import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { HashingService } from 'src/common/hashing/hashing.service';
import { User } from 'src/user/domain/entity/user.entity';
import { UserRepositoryService } from 'src/user/infra/repository/user.repository.service';
import {
  CreateUserService,
  CreateUserServiceParamsDTO,
} from 'src/user/services/create.service';
import { makeFakeUserEntity } from '../domain/user.entity.spec';
import { HashingServiceMock } from 'test/mocks/hashing.service.mock';
import { UserRepositoryServiceMock } from 'test/mocks/user.repository.mock';

describe('CreateService', () => {
  let service: CreateUserService;
  let params: CreateUserServiceParamsDTO;
  let hashedPassword: string;
  let fakeUser: User;

  beforeAll(() => {
    hashedPassword = 'hashedPassword';
    const hashSpy = jest.spyOn(HashingServiceMock.prototype, 'hash');
    hashSpy.mockResolvedValue(hashedPassword);
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserService, UserRepositoryService, HashingService],
    })
      .overrideProvider(UserRepositoryService)
      .useClass(UserRepositoryServiceMock)
      .overrideProvider(HashingService)
      .useClass(HashingServiceMock)
      .compile();

    service = module.get<CreateUserService>(CreateUserService);

    params = {
      data: {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: faker.internet.password(),
        phoneNumber: {
          ddd: faker.phone.number('##'),
          ddi: faker.phone.number('##'),
          number: faker.phone.number('#########'),
        },
      },
    };

    fakeUser = makeFakeUserEntity();
    jest.spyOn(User, 'create').mockReturnValue(fakeUser);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findOneByPhoneNumber with params phone number', async () => {
    const findOneByPhoneNumberSpy = jest.spyOn(
      UserRepositoryServiceMock.prototype,
      'findOneByPhoneNumber',
    );

    await service.execute(params);

    expect(findOneByPhoneNumberSpy).toHaveBeenCalledWith(
      params.data.phoneNumber,
    );
  });

  it('should throw an error if user already exists', async () => {
    jest
      .spyOn(UserRepositoryServiceMock.prototype, 'findOneByPhoneNumber')
      .mockResolvedValueOnce(fakeUser);

    await expect(service.execute(params)).rejects.toThrow(
      'User already exists',
    );
  });

  it("should call hashingService's hash method with params password", async () => {
    const hashSpy = jest.spyOn(HashingServiceMock.prototype, 'hash');

    await service.execute(params);

    expect(hashSpy).toHaveBeenCalledWith(params.data.password);
  });

  it('should call User.create with params data and hashed password', async () => {
    const createSpy = jest.spyOn(User, 'create');

    await service.execute(params);

    expect(createSpy).toHaveBeenCalledWith({
      firstName: params.data.firstName,
      lastName: params.data.lastName,
      password: hashedPassword,
      phoneNumber: params.data.phoneNumber,
    });
  });
  it('should call userRepositoryService create method', async () => {
    const createSpy = jest.spyOn(UserRepositoryServiceMock.prototype, 'create');

    await service.execute(params);

    expect(createSpy).toHaveBeenCalledWith(fakeUser);
  });

  it('should return user', async () => {
    const response = await service.execute(params);

    expect(response).toEqual({
      user: fakeUser,
    });
  });
});
