import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { get } from 'env-var';
import { DbNamingStrategy } from './db-naming.strategy';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { Article } from '../../modules/article/infrastructure/persistence/entity/article';
import { User } from '../../modules/user/infrastructure/entity/user';

export class DatabaseConfig implements TypeOrmOptionsFactory {
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: get('DB_HOST').required().asString(),
      username: get('DB_USER').required().asString(),
      password: get('DB_PASS').required().asString(),
      port: get('DB_PORT').asPortNumber(),
      database: get('DB_NAME').required().asString(),
      logging: get('DB_LOGGING').asBool(),
      synchronize: false,
      entities: [Article, User],
      namingStrategy: new DbNamingStrategy(),
    };
  }
}
