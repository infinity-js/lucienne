import { Test, TestingModule } from '@nestjs/testing';
import { HashingService } from 'src/common/hashing/hashing.service';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed-string'),
}));
describe('HashingService', () => {
  let service: HashingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashingService],
    }).compile();

    service = module.get<HashingService>(HashingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should hash a string', async () => {
    const hashedString = await service.hash('test');
    expect(hashedString).toBe('hashed-string');
  });
});
