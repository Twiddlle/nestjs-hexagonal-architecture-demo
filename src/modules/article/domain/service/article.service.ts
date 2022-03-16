import { ArticleRepositoryInterface } from '../ports/article-repository.interface';
import { ArticleNotFoundException } from '../exception/article-not-found.exception';
import { ArticleAggregate } from '../aggregates/article.aggregate';
import { ArticleUserRepositoryInterface } from '../ports/article-user-repository.interface';

export class ArticleService {
  public constructor(
    private readonly articleRepository: ArticleRepositoryInterface,
    private readonly articleUserRepository: ArticleUserRepositoryInterface,
  ) {}

  public async findById(id: number): Promise<ArticleAggregate> {
    const article = await this.articleRepository.findById(id);
    if (!article) {
      throw new ArticleNotFoundException();
    }

    const user = await this.articleUserRepository.findUserById(article.userId);

    return Object.assign(new ArticleAggregate(), {
      article,
      user,
    });
  }
}
