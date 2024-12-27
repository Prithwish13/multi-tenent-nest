import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './exception-filter/http-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggerInstance = app.get(Logger);
  const config = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter(loggerInstance));
  await app.listen(config.get('port'));
}
bootstrap();
