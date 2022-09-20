import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserRestService } from 'src/user/rest-services/create.rest-service';
import { UserService } from 'src/user/user.service';

const mockService = {
  create: jest.fn(),
};
describe('CreateUserRestService', () => {
  let service: CreateUserRestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserRestService, UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockService)
      .compile();

    service = module.get<CreateUserRestService>(CreateUserRestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it("should call the service's create method", async () => {
    await service.execute({ any: 'param' } as any);

    expect(mockService.create).toHaveBeenCalledWith({
      data: { any: 'param' },
    });
  });
});
