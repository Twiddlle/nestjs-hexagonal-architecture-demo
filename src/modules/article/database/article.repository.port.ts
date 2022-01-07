import { RepositoryPort } from '../../../packages/domain/ports/repository.port';
import { ArticleEntity } from '../domain/entities/article.entity';

export interface ArticleRepositoryPort extends RepositoryPort<ArticleEntity> {
  findById(id: number): Promise<ArticleEntity>;
}
