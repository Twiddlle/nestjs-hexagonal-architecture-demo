import { TypeormRepositoryBase } from '../../../../common/infrastructure/persistence/orm/typeorm.repository.base';
import { UserRepositoryInterface } from '../../domain/ports/user-repository.interface';
import { UserEntity } from '../../domain/entity/user.entity';
import { User } from '../entity/user';

export class UserRepository
  extends TypeormRepositoryBase<UserEntity, User>
  implements UserRepositoryInterface {}
