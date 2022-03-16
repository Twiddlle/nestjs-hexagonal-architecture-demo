import { ArticleEntity } from '../entities/article.entity';
import { ArticleUserEntity } from '../entities/article-user.entity';

export class ArticleAggregate {
  public article: ArticleEntity;
  public user: ArticleUserEntity;
}
