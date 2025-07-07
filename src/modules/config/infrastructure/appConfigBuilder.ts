import { appConfigEnvSchema } from 'src/modules/config/infrastructure/appConfigEnvSchema';
import { AppConfig } from 'src/modules/config/domain/AppConfig';
import { DbConfig } from 'src/modules/config/domain/DbConfig';
import { ConfigModule } from '@nestjs/config';

export function buildAppConfig() {
  try {
    // eslint-disable-next-line no-process-env
    const parsedConfigData = appConfigEnvSchema.parse(process.env);
    return new AppConfig({
      appPort: parsedConfigData.APP_PORT,
      appVersion: parsedConfigData.APP_VERSION,

      db: new DbConfig({
        connectionString: parsedConfigData.DB_CONNECTION_STRING,
      }),
    });
  } catch (error) {
    throw new Error(`ENV failed: ${(error as Error).message}`);
  }
}

export function provideConfigEnvFilePath() {
  // eslint-disable-next-line no-process-env
  if (process.env.ENV_FILE) {
    // eslint-disable-next-line no-process-env
    return process.env.ENV_FILE;
    // eslint-disable-next-line no-process-env
  } else if (process.env.NODE_ENV === 'test') {
    return '.env.test';
  }

  return '.env';
}

// this function will load env file
export function provideConfigModule() {
  return ConfigModule.forRoot({
    envFilePath: provideConfigEnvFilePath(),
  });
}
