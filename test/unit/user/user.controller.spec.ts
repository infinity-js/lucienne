import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserRestService } from 'src/user/rest-services/create.rest-service';
import { UserController } from 'src/user/user.controller';

const mockService = {
  execute: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [CreateUserRestService],
    })
      .overrideProvider(CreateUserRestService)
      .useValue(mockService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it("should call the create service's execute method", () => {
    const anyParams = { any: 'params' };

    controller.create(anyParams as any);

    expect(mockService.execute).toHaveBeenCalledWith(anyParams);
  });
});
