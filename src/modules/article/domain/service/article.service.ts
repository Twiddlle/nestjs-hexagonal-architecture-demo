import { ArticleRepositoryInterface } from '../ports/article-repository.interface';
import { ArticleNotFoundException } from '../exception/article-not-found.exception';
import { ArticleAggregate } from '../aggregates/article.aggregate';
import { ArticleUserRepositoryInterface } from '../ports/article-user-repository.interface';
import { ArticleEntity } from '../entities/article.entity';
import { ArticleEventDispatcherInterface } from '../ports/article-event-dispatcher.interface';
import { ArticleStoredEvent } from '../events/article-stored.event';

export class ArticleService {
  public constructor(
    private readonly articleRepository: ArticleRepositoryInterface,
    private readonly articleUserRepository: ArticleUserRepositoryInterface,
    private readonly articleEventDispatcher: ArticleEventDispatcherInterface,
  ) {}

  public async findById(id: number): Promise<ArticleAggregate> {
    const article = await this.articleRepository.findById(id);
    if (!article) {
      throw new ArticleNotFoundException();
    }

    const user = await this.articleUserRepository.findUserById(article.userId);
    const articleAggregate = new ArticleAggregate();
    articleAggregate.article = article;
    articleAggregate.user = user;
    return articleAggregate;
  }

  public async save(articleEntity: ArticleEntity): Promise<ArticleEntity> {
    const article = await this.articleRepository.save(articleEntity);
    this.articleEventDispatcher.dispatchStore(new ArticleStoredEvent(article));
    return article;
  }
}
