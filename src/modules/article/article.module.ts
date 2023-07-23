import { Module, Provider } from '@nestjs/common';
import { ArticleRepository } from './infrastructure/persistence/article.repository';
import { EntityManagerProvider } from '../../common/infrastructure/persistence/entity-manager.provider';
import { Article } from './infrastructure/persistence/entity/article';
import { AppConfigModule } from '../config/application/app-config.module';
import { ArticleService } from './domain/service/article.service';
import { ArticleController } from './application/presenter/rest/article-controller';
import { ArticleUserRepository } from './infrastructure/persistence/article-user.repository';
import { CqrsModule } from '@nestjs/cqrs';
import { ArticleEventDispatcher } from './infrastructure/event/article-event-dispatcher';
import { GetArticleCountsByUserIdQueryHandler } from './application/query/get-article-counts-by-user-id.query-handler';
import { ArticleResolver } from './application/presenter/graph-ql/article.resolver';

const articleRepository: Provider = {
  provide: ArticleRepository,
  useFactory: (entityManagerProvider: EntityManagerProvider) => {
    return new ArticleRepository(entityManagerProvider.getRepository(Article));
  },
  inject: [EntityManagerProvider],
};

const articleService: Provider = {
  provide: ArticleService,
  useFactory: (
    articleRepo: ArticleRepository,
    articleUserRepo: ArticleUserRepository,
    articleEventDispatcher: ArticleEventDispatcher,
  ) => {
    return new ArticleService(
      articleRepo,
      articleUserRepo,
      articleEventDispatcher,
    );
  },
  inject: [ArticleRepository, ArticleUserRepository, ArticleEventDispatcher],
};

const providers: Provider[] = [
  articleRepository,
  articleService,
  EntityManagerProvider,

  // repository
  ArticleUserRepository,

  // events
  ArticleEventDispatcher,

  // query
  GetArticleCountsByUserIdQueryHandler,

  // graphql
  ArticleResolver,
];

@Module({
  imports: [AppConfigModule, CqrsModule],
  providers: providers,
  exports: providers,
  controllers: [ArticleController],
})
export class ArticleModule {}
