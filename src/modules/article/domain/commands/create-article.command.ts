import { ArticleEntity } from '../entities/article.entity';

export class CreateArticleCommand {
  public constructor(public readonly article: Partial<ArticleEntity>) {}
}
