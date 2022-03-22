import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetArticleCountsByUserIdQuery } from '../../domain/query/get-article-counts-by-user-id.query';
import { ArticleRepository } from '../../infrastructure/persistence/article.repository';

@QueryHandler(GetArticleCountsByUserIdQuery)
export class GetArticleCountsByUserIdQueryHandler
  implements IQueryHandler<GetArticleCountsByUserIdQuery>
{
  public constructor(private readonly articleRepository: ArticleRepository) {}

  public execute(query: GetArticleCountsByUserIdQuery): Promise<any> {
    return this.articleRepository.countArticlesByCriteria({
      userId: query.userId,
    });
  }
}
