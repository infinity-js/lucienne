import { Test, TestingModule } from '@nestjs/testing';
import { HashingModule } from 'src/common/hashing/hashing.module';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';

describe('User Module', () => {
  let userModule: TestingModule;

  beforeEach(async () => {
    userModule = await Test.createTestingModule({
      imports: [UserModule, PrismaModule, HashingModule],
    }).compile();
  });

  it('should be defined', () => {
    const module = userModule.get<UserModule>(UserModule);

    expect(module).toBeDefined();
  });
});
