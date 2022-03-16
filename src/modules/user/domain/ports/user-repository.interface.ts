import { UserEntity } from '../entity/user.entity';

export interface UserRepositoryInterface {
  findById(id: number): Promise<UserEntity>;
}
