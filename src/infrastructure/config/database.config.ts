import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import path from 'path';
import { get } from 'env-var';
import { DbNamingStrategy } from '../database/db-naming.strategy';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';

export class DatabaseConfig implements TypeOrmOptionsFactory {
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: get('DB_HOST').required().asString(),
      username: get('DB_USER').required().asString(),
      password: get('DB_PASSWORD').required().asString(),
      port: get('DB_PORT').asPortNumber(),
      database: get('DB_NAME').required().asString(),
      logging: get('DB_LOGGING').asBool(),
      synchronize: get('DB_SYNCHRONIZE').asBool(),
      entities: [
        path.join(__dirname, '..', 'src', '**', '*.orm-entity.js'),
        path.join(__dirname, '..', 'src', '**', '*.orm-entity.ts'),
      ],
      namingStrategy: new DbNamingStrategy(),
      migrations: ['src/**/migrations/*.ts'],
      cli: {
        migrationsDir: 'src/infrastructure/database/migrations',
      },
    };
  }
}
