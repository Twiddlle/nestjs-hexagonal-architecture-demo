import {
  INestApplication,
  Module,
  NestApplicationOptions,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AdminComponent } from 'src/components/admin/infrastructure/AdminComponent';
import { BlogComponent } from 'src/components/blog/infrastructure/BlogComponent';
import { patchNestJsSwagger, ZodValidationPipe } from 'nestjs-zod';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SharedComponent } from 'src/components/shared/SharedComponent';

@Module({
  imports: [AdminComponent, BlogComponent, SharedComponent],
})
class AppModule {}

export async function createApi(options?: NestApplicationOptions) {
  const basePath = '/api';

  const app = await NestFactory.create(AppModule, {
    ...options,
  });

  app.useGlobalPipes(new ZodValidationPipe());
  app.setGlobalPrefix(basePath);

  await useSwagger(app, basePath);

  return app;
}

export async function useSwagger(app: INestApplication, basePath: string) {
  patchNestJsSwagger();

  const swaggerDocument = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('Hexagonal Architecture with NestJS')
      .setDescription(
        'API documentation for Hexagonal Architecture with NestJS',
      )
      .setVersion('1.0')
      // .addServer(basePath)
      .build(),
  );

  SwaggerModule.setup('explorer', app, swaggerDocument);
}
