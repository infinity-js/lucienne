import { Module } from '@nestjs/common';
import { HashingModule } from 'src/common/hashing/hashing.module';
import { infra } from './infra';
import { restServices } from './rest-services';
import { services } from './services';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [HashingModule],
  providers: [...services, ...restServices, ...infra, UserService],
  controllers: [UserController],
})
export class UserModule {}
