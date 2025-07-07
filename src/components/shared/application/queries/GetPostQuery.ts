import { Query } from '@nestjs/cqrs';
import { PostAggregate } from 'src/components/blog/domain/aggregates/PostAggregate';

export class GetPostQuery extends Query<PostAggregate | undefined> {
  public constructor(public readonly postId: number) {
    super();
  }
}
