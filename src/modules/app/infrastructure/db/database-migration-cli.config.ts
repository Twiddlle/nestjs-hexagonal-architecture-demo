import { ConfigModule } from '@nestjs/config';
import { DatabaseConfig } from '../../../../config/db/database.config';

async function getConfig() {
  ConfigModule.forRoot(); // not used for anything for now, just to load .env file
  return Object.assign(new DatabaseConfig().createTypeOrmOptions(), {
    migrations: ['src/migrations/*.ts'],
    cli: {
      migrationsDir: 'src/migrations',
    },
  });
}

export default getConfig();
