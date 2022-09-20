import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from 'src/user/services/create.service';
import { UserService } from 'src/user/user.service';

const mockService = {
  execute: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, CreateUserService],
    })
      .overrideProvider(CreateUserService)
      .useValue(mockService)
      .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should call the create service's execute method", () => {
    const anyParams = { any: 'params' };

    service.create(anyParams as any);

    expect(mockService.execute).toHaveBeenCalledWith(anyParams);
  });
});
