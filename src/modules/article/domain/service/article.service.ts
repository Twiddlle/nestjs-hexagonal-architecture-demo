import { ArticleRepositoryInterface } from '../ports/article-repository.interface';
import { ArticleEntity } from '../entities/article.entity';
import { ArticleNotFoundException } from '../exception/article-not-found.exception';

export class ArticleService {
  public constructor(
    private readonly articleRepository: ArticleRepositoryInterface,
  ) {}

  public async findById(id: number): Promise<ArticleEntity> {
    const article = await this.articleRepository.findById(id);
    if (!article) {
      throw new ArticleNotFoundException();
    }
    return article;
  }
}
