import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.HTTP_PORT || 3000;

  await app.listen(port);

  const swaggerConfigBuilding = new DocumentBuilder()
    .setTitle('Lucienne')
    .setDescription('API documentation for Lucienne')
    .setVersion('1.0')
    .addTag('Users');

  if (process.env.NODE_ENV === 'development') {
    swaggerConfigBuilding.addServer(`http://localhost:${port}`);
  }

  const swaggerConfig = swaggerConfigBuilding.build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  writeFileSync(
    join(__dirname, '..', 'api-docs', 'lucienne.json'),
    JSON.stringify(swaggerDocument),
  );
}
bootstrap();

process.on('unhandledRejection', (err) => {
  console.log(err);
});

process.on('uncaughtException', (err) => {
  console.log(err);
});
