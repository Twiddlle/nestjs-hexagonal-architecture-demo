import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './modules/app/application/app.module';
import { ConsoleLogger } from '@nestjs/common';
import { HttpExceptionFilter } from './modules/app/application/filters/http-exception.filter';
import { AppConfig } from './config/app.config';

async function createApp() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      logger: new ConsoleLogger(),
    },
  );

  app.enableCors();
  const appConfig = app.get(AppConfig);
  app.useGlobalFilters(new HttpExceptionFilter(appConfig));
  await buildApiDocs(app, appConfig);
  return app;
}

export async function buildApiDocs(
  app: NestExpressApplication,
  appConfig: AppConfig,
) {
  const config = new DocumentBuilder()
    .setTitle('NestJS Hexagonal architecture demo')
    .setDescription('NestJS Hexagonal architecture demo open api doc')
    .setVersion(appConfig.appVersion)
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [],
  });
  SwaggerModule.setup('explorer', app, document);
}

async function bootstrap() {
  const app = await createApp();
  await app.listen(app.get(AppConfig).appPort);
  return app;
}

export { bootstrap, createApp };
