import { ArticleEntity } from '../entities/article.entity';

export interface ArticleRepositoryInterface {
  findById(id: number): Promise<ArticleEntity>;
}
