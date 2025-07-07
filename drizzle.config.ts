provideConfigModule();

import { defineConfig } from 'drizzle-kit';
import { migrationDir } from 'src/db/dbConstants';
import {
  buildAppConfig,
  provideConfigModule,
} from 'src/modules/config/infrastructure/appConfigBuilder';

const appConfig = buildAppConfig();

export const drizzleConfig = defineConfig({
  schema: './src/db/schema.ts',
  out: migrationDir,
  migrations: {
    prefix: 'timestamp',
  },
  dialect: 'postgresql',
  breakpoints: false,
  dbCredentials: {
    url: appConfig.db.connectionString,
  },
});

export default drizzleConfig;
