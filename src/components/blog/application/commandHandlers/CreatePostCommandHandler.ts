import {
  CommandBus,
  CommandHandler,
  ICommandHandler,
  QueryBus,
} from '@nestjs/cqrs';
import { CreatePostCommand } from 'src/components/shared/application/commands/CreatePostCommand';
import { PostRepositoryInterface } from 'src/components/blog/domain/ports/persistence/PostRepositoryInterface';
import { Inject } from '@nestjs/common';
import { GetUserQuery } from 'src/components/shared/application/queries/GetUserQuery';
import { CreateUserCommand } from 'src/components/shared/application/commands/CreateUserCommand';

@CommandHandler(CreatePostCommand)
export class CreatePostCommandHandler
  implements ICommandHandler<CreatePostCommand>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject('PostRepository')
    private readonly postRepository: PostRepositoryInterface,
  ) {}

  async execute(command: CreatePostCommand): Promise<{ id: number }> {
    // todo: remove hardcoded user
    const dummyUserId = 999;

    const user = await this.queryBus.execute(new GetUserQuery(dummyUserId));

    if (!user) {
      // create dummy user
      await this.commandBus.execute(
        new CreateUserCommand({
          userData: {
            id: dummyUserId,
            name: 'Dummy User',
            role: 'user',
          },
        }),
      );
    }

    const post = await this.postRepository.create({
      ...command.postData,
      userId: dummyUserId,
    });

    return { id: post.id };
  }
}
