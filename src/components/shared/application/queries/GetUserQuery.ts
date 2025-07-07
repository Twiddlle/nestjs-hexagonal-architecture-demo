import { User } from 'src/components/admin/domain/entities/User';
import { Query } from '@nestjs/cqrs';

export class GetUserQuery extends Query<User | undefined> {
  public constructor(public readonly userId: number) {
    super();
  }
}
