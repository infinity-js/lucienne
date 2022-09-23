import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PrismaModule } from './common/prisma/prisma.module';
import { RabbitMQModule } from './common/rabbitmq/rabbitmq.module';
import { UserModule } from './user/user.module';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'api-docs'),
      serveRoot: '/api-docs',
    }),
    UserModule,
    RabbitMQModule,
    PrismaModule,
  ],
  controllers: [],
})
export class AppModule {}
