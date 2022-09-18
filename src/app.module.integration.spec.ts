import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { UserModule } from './user/user.module';

describe('App Module', () => {
  let appModule: TestingModule;

  beforeEach(async () => {
    appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    const module = appModule.get<AppModule>(AppModule);

    expect(module).toBeDefined();
  });

  it('should have a UserModule', () => {
    const userModule = appModule.get<UserModule>(UserModule);

    expect(userModule).toBeDefined();
  });
});
