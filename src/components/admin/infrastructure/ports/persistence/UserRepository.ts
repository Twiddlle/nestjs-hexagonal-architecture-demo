import { User } from 'src/components/admin/domain/entities/User';
import { UserRepositoryInterface } from 'src/components/admin/domain/ports/persistence/UserRepositoryInterface';
import { DbType } from 'src/db/dbTypes';
import { eq } from 'drizzle-orm';
import { users } from 'src/db/schema';

export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly dbType: DbType) {}

  async findById(id: number): Promise<User | undefined> {
    return this.dbType.query.users.findFirst({
      where: eq(users.id, id),
    });
  }

  async create(data: User): Promise<User> {
    return (await this.dbType.insert(users).values(data).returning())[0];
  }
}
