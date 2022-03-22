import { EventsHandler, IEventHandler, QueryBus } from '@nestjs/cqrs';
import { ArticleStoredEvent } from '../../../article/domain/events/article-stored.event';
import { UserRepositoryInterface } from '../../domain/ports/user-repository.interface';
import { GetArticleCountsByUserIdQuery } from '../../../article/domain/query/get-article-counts-by-user-id.query';

@EventsHandler(ArticleStoredEvent)
export class ArticleStoredEventHandler
  implements IEventHandler<ArticleStoredEvent>
{
  public constructor(
    private readonly userRepository: UserRepositoryInterface,
    private readonly queryBus: QueryBus,
  ) {}

  public async handle(event: ArticleStoredEvent) {
    const user = await this.userRepository.findById(event.article.userId);
    user.articleCount = await this.queryBus.execute(
      new GetArticleCountsByUserIdQuery(event.article.userId),
    );
    await this.userRepository.save(user);
  }
}
