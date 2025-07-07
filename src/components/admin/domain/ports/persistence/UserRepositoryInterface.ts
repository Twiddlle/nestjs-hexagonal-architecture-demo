import { User } from 'src/components/admin/domain/entities/User';

export interface UserRepositoryInterface {
  findById(id: number): Promise<User | undefined>;
  create(data: User): Promise<User>;
}
