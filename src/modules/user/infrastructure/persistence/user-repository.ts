import { TypeormRepositoryBase } from '../../../../common/infrastructure/persistence/orm/typeorm.repository.base';
import { UserRepositoryInterface } from '../../domain/ports/user-repository.interface';
import { UserEntity, UserEntityState } from '../../domain/entity/user.entity';
import { User, UserState } from '../entity/user';

export class UserRepository
  extends TypeormRepositoryBase<UserEntity, User>
  implements UserRepositoryInterface
{
  public fromDomain(userEntity: UserEntity) {
    const user = new User();
    user.id = userEntity.id;
    user.name = userEntity.name;
    user.articleCount = userEntity.articleCount;
    user.state = UserState[userEntity.state];
    return user;
  }

  public toDomain(user: User) {
    const userEntity = new UserEntity();
    userEntity.id = user.id;
    userEntity.name = user.name;
    userEntity.articleCount = user.articleCount;
    userEntity.state = Object.keys(UserState)[
      Object.values(UserState).indexOf(user.state)
    ] as UserEntityState;
    return userEntity;
  }
}
