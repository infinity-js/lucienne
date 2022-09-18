import { Test, TestingModule } from '@nestjs/testing';
import { UserModule } from './user.module';

describe('User Module', () => {
  let userModule: TestingModule;

  beforeEach(async () => {
    userModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();
  });

  it('should be defined', () => {
    const module = userModule.get<UserModule>(UserModule);

    expect(module).toBeDefined();
  });
});
