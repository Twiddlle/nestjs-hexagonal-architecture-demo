import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/components/shared/application/commands/CreateUserCommand';
import { UserRepositoryInterface } from 'src/components/admin/domain/ports/persistence/UserRepositoryInterface';
import { Inject } from '@nestjs/common';

@CommandHandler(CreateUserCommand)
export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    await this.userRepository.create(command.userData);
  }
}
