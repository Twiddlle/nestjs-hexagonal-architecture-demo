import { Module, Provider } from '@nestjs/common';
import { ArticleRepository } from './infrastructure/persistence/article.repository';
import { EntityManagerProvider } from '../../common/infrastructure/persistence/entity-manager.provider';
import { Article } from './infrastructure/persistence/entity/article';
import { EntityOrmMapper } from '../../common/infrastructure/persistence/entity-orm.mapper';
import { ArticleEntity } from './domain/entities/article.entity';
import { AppConfigModule } from '../config/application/app-config.module';
import { ArticleService } from './domain/service/article.service';
import { ArticleController } from './application/presenter/restx/ArticleController';

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
  useFactory: (repository: ArticleRepository) => {
    return new ArticleService(repository);
  },
  inject: [ArticleRepository],
};

@Module({
  imports: [AppConfigModule],
  providers: [articleRepository, articleService, EntityManagerProvider],
  exports: [articleRepository, articleService, EntityManagerProvider],
  controllers: [ArticleController],
})
export class ArticleModule {}
