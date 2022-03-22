import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../../../article/domain/query/get-user-by-id.query';
import { UserRepository } from '../../infrastructure/persistence/user-repository';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler
  implements IQueryHandler<GetUserByIdQuery>
{
  public constructor(private readonly userRepository: UserRepository) {}

  public execute(query: GetUserByIdQuery): Promise<any> {
    return this.userRepository.findById(query.userId);
  }
}
