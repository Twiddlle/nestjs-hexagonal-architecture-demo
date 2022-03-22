import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config/application/app-config.module';
import { CqrsModule, QueryBus } from '@nestjs/cqrs';
import { UserRepository } from './infrastructure/persistence/user-repository';
import { EntityManagerProvider } from '../../common/infrastructure/persistence/entity-manager.provider';
import { User } from './infrastructure/entity/user';
import { UserEntity } from './domain/entity/user.entity';
import { EntityOrmMapper } from '../../common/infrastructure/persistence/entity-orm.mapper';
import { GetUserByIdQueryHandler } from './application/query/get-user-by-id.query-handler';
import { ArticleStoredEventHandler } from './application/event/article-stored.event-handler';

@Module({
  imports: [AppConfigModule, CqrsModule],
  providers: [
    {
      provide: UserRepository,
      useFactory: (entityManagerProvider: EntityManagerProvider) => {
        return new UserRepository(
          entityManagerProvider.getRepository(User),
          new EntityOrmMapper(UserEntity, User),
        );
      },
      inject: [EntityManagerProvider],
    },
    {
      provide: ArticleStoredEventHandler,
      useFactory: (userRepository: UserRepository, queryBus: QueryBus) => {
        return new ArticleStoredEventHandler(userRepository, queryBus);
      },
      inject: [UserRepository, QueryBus],
    },
    EntityManagerProvider,
    GetUserByIdQueryHandler,
  ],
})
export class UserModule {}
