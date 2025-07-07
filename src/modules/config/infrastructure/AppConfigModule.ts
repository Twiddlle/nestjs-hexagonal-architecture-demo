import { Module } from '@nestjs/common';
import { AppConfig } from 'src/modules/config/domain/AppConfig';
import {
  buildAppConfig,
  provideConfigModule,
} from 'src/modules/config/infrastructure/appConfigBuilder';
import { DbConfig } from 'src/modules/config/domain/DbConfig';

@Module({
  imports: [provideConfigModule()],
  providers: [
    {
      provide: AppConfig,
      useFactory: (): AppConfig => buildAppConfig(),
    },
    {
      provide: DbConfig,
      useFactory: (appConfig: AppConfig) => appConfig.db,
      inject: [AppConfig],
    },
  ],
  exports: [AppConfig, DbConfig],
})
export class AppConfigModule {}
