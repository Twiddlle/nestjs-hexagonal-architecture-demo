import { ArticleBaseException } from './article-base.exception';

export class ArticleNotFoundException extends ArticleBaseException {
  public constructor() {
    super('Article not found');
  }
}
