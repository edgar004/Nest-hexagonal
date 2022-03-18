import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionHandler } from './http/exceptions';
import { ValidationPipe } from '@nestjs/common';
import { HttpResponseInterceptor } from './http/interceptors';
const { API_PORT = 8080, API_PREFIX } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionHandler());
  app.useGlobalInterceptors(new HttpResponseInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix(API_PREFIX);
  await app.listen(API_PORT);
}

bootstrap().then(() => {
  console.log(`Application started on port: ${API_PORT}`);
});
