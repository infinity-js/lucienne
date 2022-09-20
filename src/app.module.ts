import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { UserModule } from './user/user.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'api-docs'),
      serveRoot: '/api-docs',
    }),
    UserModule,
    PrismaModule,
  ],
})
export class AppModule {}
