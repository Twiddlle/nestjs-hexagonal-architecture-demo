import { Command } from '@nestjs/cqrs';
import { CommandType } from 'src/components/shared/application/cqrsTypes';

export class CreatePostCommand extends Command<{ id: number }> {
  readonly postData!: {
    title: string;
    body: string;
    userId?: number;
  };

  public constructor(data: CommandType<CreatePostCommand>) {
    super();
    Object.assign(this, data);
  }
}
