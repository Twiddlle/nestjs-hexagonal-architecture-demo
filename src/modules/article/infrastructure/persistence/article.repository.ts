import { ArticleEntity } from '../../domain/entities/article.entity';
import { TypeormRepositoryBase } from '../../../../common/infrastructure/persistence/orm/typeorm.repository.base';
import { Article } from './entity/article';
import { ArticleRepositoryInterface } from '../../domain/ports/article-repository.interface';

export class ArticleRepository
  extends TypeormRepositoryBase<ArticleEntity, Article>
  implements ArticleRepositoryInterface
{
  public countArticlesByCriteria(
    criteria: Record<keyof ArticleEntity | string, any>,
  ): Promise<number> {
    return this.repository.count(criteria);
  }
}
