import { Module } from '@nestjs/common';
import { GetUserQueryHandler } from 'src/components/admin/application/queryHandlers/GetUserQueryHandler';
import { UserRepository } from 'src/components/admin/infrastructure/ports/persistence/UserRepository';
import {
  DRIZZLE_PROVIDER,
  OrmModule,
} from 'src/modules/orm/infrastructure/OrmModule';
import { DbType } from 'src/db/dbTypes';
import { CqrsModule } from '@nestjs/cqrs';
import { AppConfigModule } from 'src/modules/config/infrastructure/AppConfigModule';
import { CreateUserCommandHandler } from 'src/components/admin/application/commandHandlers/CreateUserCommandHandler';

@Module({
  imports: [OrmModule, CqrsModule, AppConfigModule],

  providers: [
    // repositories
    {
      provide: 'UserRepository',
      useFactory: (dbType: DbType) => {
        return new UserRepository(dbType);
      },
      inject: [DRIZZLE_PROVIDER],
    },

    // query handlers
    GetUserQueryHandler,

    // command handlers
    CreateUserCommandHandler,
  ],
})
export class AdminComponent {}
