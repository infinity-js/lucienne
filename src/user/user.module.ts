import { Module } from '@nestjs/common';
import { CreateUserService } from './services/create/create.service';

@Module({
  providers: [CreateUserService],
})
export class UserModule {}
