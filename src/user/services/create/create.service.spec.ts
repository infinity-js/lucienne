import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from './create.service';

describe('CreateService', () => {
  let service: CreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateUserService],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a message', () => {
    expect(service.execute()).toBe('This service adds a new user');
  });
});
