import { Module } from '@nestjs/common';
import { HashingModule } from 'src/common/hashing/hashing.module';
import { CreateUserService } from './services/create/create.service';

@Module({
  imports: [HashingModule],
  providers: [CreateUserService],
})
export class UserModule {}
