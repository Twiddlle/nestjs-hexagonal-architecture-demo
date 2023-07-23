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

  protected fromDomain(entity: ArticleEntity): Article {
    const article = new Article();
    article.id = entity.id;
    article.title = entity.title;
    article.body = entity.body;
    article.userId = entity.userId;
    article.createdAt = entity.createdAt;
    article.updatedAt = entity.updatedAt;
    return article;
  }

  protected toDomain(entity: Article): ArticleEntity {
    const articleEntity = new ArticleEntity();
    articleEntity.id = entity.id;
    articleEntity.title = entity.title;
    articleEntity.body = entity.body;
    articleEntity.userId = entity.userId;
    articleEntity.createdAt = entity.createdAt;
    articleEntity.updatedAt = entity.updatedAt;
    return articleEntity;
  }
}
