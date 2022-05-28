import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {RequestMethod, ValidationPipe} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));
  app.enableCors();
  app.setGlobalPrefix('api', { exclude: [
    {
      path: '.well-known/pki-validation/3261FC6A37BFF23693EFD1B4C7AE49D7.txt',
      method: RequestMethod.GET
    },
    ]});

  const config = new DocumentBuilder()
      .setTitle('InterviewBoom API doc')
      .setDescription('InterviewBoom API')
      .setVersion('1.0')
      .addTag('users')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
