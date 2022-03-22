import { ArticleEntity } from '../entities/article.entity';

export class ArticleStoredEvent {
  public constructor(public article: ArticleEntity) {}
}
