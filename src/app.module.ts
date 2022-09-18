import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './common/prisma/prisma.module';

@Module({
  imports: [UserModule, PrismaModule],
})
export class AppModule {}
