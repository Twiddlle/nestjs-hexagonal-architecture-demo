import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from 'src/db/schema';
import { Pool, PoolClient } from 'pg';
import { DbConfig } from 'src/modules/config/domain/DbConfig';
import { AppConfigModule } from 'src/modules/config/infrastructure/AppConfigModule';

export const DRIZZLE_PROVIDER = 'DRIZZLE_PROVIDER';
export const DB_POOL_PROVIDER = 'DB_POOL_PROVIDER';

export class DbConnectionPoolProvider {
  pool: Pool;
  client: PoolClient;

  constructor(pool: Pool, client: PoolClient) {
    this.pool = pool;
    this.client = client;
  }
}

@Module({
  imports: [AppConfigModule],
  providers: [
    {
      provide: DB_POOL_PROVIDER,
      useFactory: async (dbConfig: DbConfig) => {
        const pool = new Pool({
          connectionString: dbConfig.connectionString,
        });

        const client = await pool.connect();

        pool.on('error', console.error);
        client.on('error', console.error);

        return new DbConnectionPoolProvider(pool, client);
      },
      inject: [DbConfig],
    },
    {
      provide: DRIZZLE_PROVIDER,
      useFactory: (dbConnectionPoolProvider: DbConnectionPoolProvider) => {
        return drizzle(dbConnectionPoolProvider.pool, {
          schema,
          logger: true, // todo: make it configurable
        });
      },
      inject: [DB_POOL_PROVIDER, DbConfig],
    },
  ],
  exports: [DRIZZLE_PROVIDER],
})
export class OrmModule {}
