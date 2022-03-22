import { ArticleEntity } from '../entities/article.entity';

export interface ArticleRepositoryInterface {
  findById(id: number): Promise<ArticleEntity>;
  save(articleEntity: ArticleEntity): Promise<ArticleEntity>;
  countArticlesByCriteria(
    criteria: Record<keyof ArticleEntity | string, any>,
  ): Promise<number>;
}
