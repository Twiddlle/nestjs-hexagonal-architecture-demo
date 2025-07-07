import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from 'src/components/shared/application/queries/GetUserQuery';
import { User } from 'src/components/admin/domain/entities/User';
import { UserRepositoryInterface } from 'src/components/admin/domain/ports/persistence/UserRepositoryInterface';
import { Inject } from '@nestjs/common';

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  execute(query: GetUserQuery): Promise<User | undefined> {
    return this.userRepository.findById(query.userId);
  }
}
