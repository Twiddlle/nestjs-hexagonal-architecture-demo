import { Command } from '@nestjs/cqrs';
import { UserRole } from 'src/components/admin/domain/entities/User';
import { CommandType } from 'src/components/shared/application/cqrsTypes';

export class CreateUserCommand extends Command<void> {
  readonly userData!: {
    id: number;
    name: string;
    role: UserRole;
  };

  public constructor(data: CommandType<CreateUserCommand>) {
    super();
    Object.assign(this, data);
  }
}
