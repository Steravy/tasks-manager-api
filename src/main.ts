import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './config/HttpExceptionFilter';


async function bootstrap() {

  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5000;

  process.env.NODE_ENV === 'development' ? app.enableCors() : app.enableCors({ origin: '*', })

  app.useGlobalFilters(new HttpExceptionFilter);

  app.useGlobalPipes(

    new ValidationPipe(
      {
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true
      }

    )
  );

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle("Task Management API")
    .setDescription('REST API that support full CRUD operations for tasks, and user authentication. So you can safelly manage tasks created by you.')
    .setVersion("1.0")
    .build();


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
