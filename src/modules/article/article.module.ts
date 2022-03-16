import { Module, Provider } from '@nestjs/common';
import { ArticleRepository } from './infrastructure/persistence/article.repository';
import { EntityManagerProvider } from '../../common/infrastructure/persistence/entity-manager.provider';
import { Article } from './infrastructure/persistence/entity/article';
import { EntityOrmMapper } from '../../common/infrastructure/persistence/entity-orm.mapper';
import { ArticleEntity } from './domain/entities/article.entity';
import { AppConfigModule } from '../config/application/app-config.module';
import { ArticleService } from './domain/service/article.service';
import { ArticleController } from './application/presenter/rest/ArticleController';
import { ArticleUserRepository } from './infrastructure/persistence/article-user.repository';
import { CqrsModule } from '@nestjs/cqrs';

const articleRepository: Provider = {
  provide: ArticleRepository,
  useFactory: (entityManagerProvider: EntityManagerProvider) => {
    return new ArticleRepository(
      entityManagerProvider.getRepository(Article),
      new EntityOrmMapper(ArticleEntity, Article),
    );
  },
  inject: [EntityManagerProvider],
};

const articleService: Provider = {
  provide: ArticleService,
  useFactory: (
    articleRepo: ArticleRepository,
    articleUserRepo: ArticleUserRepository,
  ) => {
    return new ArticleService(articleRepo, articleUserRepo);
  },
  inject: [ArticleRepository, ArticleUserRepository],
};

const providers: Provider[] = [
  articleRepository,
  articleService,
  EntityManagerProvider,
  ArticleUserRepository,
];

@Module({
  imports: [AppConfigModule, CqrsModule],
  providers: providers,
  exports: providers,
  controllers: [ArticleController],
})
export class ArticleModule {}
