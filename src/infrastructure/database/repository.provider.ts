import { Provider } from '@nestjs/common';
import { EntityManagerProvider } from './entity-manager.provider';
import { ArticleRepository } from '../../modules/article/database/article.repository';
import { ArticleOrmEntity } from '../../modules/article/database/article.orm-entity';

export const articleRepository: Provider = {
  provide: ArticleRepository,
  useFactory: (entityManagerProvider: EntityManagerProvider) => {
    return new ArticleRepository(
      entityManagerProvider.entityManager.getRepository(ArticleOrmEntity),
    );
  },
  inject: [EntityManagerProvider],
};
