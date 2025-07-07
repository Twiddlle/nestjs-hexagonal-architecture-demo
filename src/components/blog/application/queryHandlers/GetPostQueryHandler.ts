import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { GetPostQuery } from 'src/components/shared/application/queries/GetPostQuery';
import { PostAggregate } from 'src/components/blog/domain/aggregates/PostAggregate';
import { PostRepositoryInterface } from 'src/components/blog/domain/ports/persistence/PostRepositoryInterface';
import { UserRepositoryInterface } from 'src/components/admin/domain/ports/persistence/UserRepositoryInterface';
import { Inject } from '@nestjs/common';
import { GetUserQuery } from 'src/components/shared/application/queries/GetUserQuery';

@QueryHandler(GetPostQuery)
export class GetPostQueryHandler implements IQueryHandler<GetPostQuery> {
  constructor(
    @Inject('PostRepository')
    private readonly postRepository: PostRepositoryInterface,
    private readonly queryBus: QueryBus,
  ) {}

  async execute(query: GetPostQuery): Promise<PostAggregate | undefined> {
    try {
      await this.postRepository.findById(query.postId);
    } catch (e) {
      console.log(e);
    }
    const post = await this.postRepository.findById(query.postId);

    if (!post) {
      return undefined;
    }

    const user = await this.queryBus.execute(new GetUserQuery(post.userId));

    if (!user) {
      throw new Error('User not found');
    }

    return {
      ...post,
      user,
    };
  }
}
