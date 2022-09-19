import { Module } from '@nestjs/common';
import { HashingModule } from 'src/common/hashing/hashing.module';
import { UserRepositoryService } from './infra/repository/user.repository.service';
import { CreateUserService } from './services/create/create.service';

@Module({
  imports: [HashingModule],
  providers: [CreateUserService, UserRepositoryService],
})
export class UserModule {}
