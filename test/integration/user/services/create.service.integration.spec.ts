import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { HashingService } from 'src/common/hashing/hashing.service';
import { UserRepositoryService } from 'src/user/infra/user.repository.service';
import {
  CreateUserService,
  CreateUserServiceParamsDTO,
} from 'src/user/services/create.service';
import { HashingServiceMock } from 'test/mocks/hashing.service.mock';
import { UserRepositoryServiceMock } from 'test/mocks/user.repository.mock';

describe('CreateUserService (Integration)', () => {
  let service: CreateUserService;
  let repository: UserRepositoryService;
  let fakeParams: CreateUserServiceParamsDTO;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserService, HashingService, UserRepositoryService],
    })
      .overrideProvider(UserRepositoryService)
      .useClass(UserRepositoryServiceMock)
      .overrideProvider(HashingService)
      .useClass(HashingServiceMock)
      .compile();

    service = module.get<CreateUserService>(CreateUserService);
    repository = module.get<UserRepositoryService>(UserRepositoryService);

    fakeParams = {
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
  });

  afterEach(async () => {
    await (repository as unknown as UserRepositoryServiceMock).clean();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const { user } = await service.execute(fakeParams);

    const userInDatabase = await repository.findOne({
      where: { id: user.id },
    });

    expect(userInDatabase).toBeDefined();
    expect(userInDatabase?.id).toBeDefined();
    expect(userInDatabase?.firstName).toEqual(fakeParams.data.firstName);
    expect(userInDatabase?.lastName).toEqual(fakeParams.data.lastName);
    expect(userInDatabase?.phoneNumber.ddd).toEqual(
      fakeParams.data.phoneNumber.ddd,
    );
    expect(userInDatabase?.phoneNumber.ddi).toEqual(
      fakeParams.data.phoneNumber.ddi,
    );
    expect(userInDatabase?.phoneNumber.number).toEqual(
      fakeParams.data.phoneNumber.number,
    );
    expect(userInDatabase?.phoneNumber.isVerified).toEqual(false);

    expect(userInDatabase?.password).toEqual(
      `hashed-${fakeParams.data.password}`,
    );

    expect(userInDatabase?.createdAt).toBeDefined();
    expect(userInDatabase?.updatedAt).toBeDefined();
  });

  it("shouldn't create a user with an existing phone number", async () => {
    await service.execute(fakeParams);

    await expect(service.execute(fakeParams)).rejects.toThrow(
      'User already exists',
    );
  });
});
