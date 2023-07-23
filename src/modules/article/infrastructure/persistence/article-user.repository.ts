import { ArticleUserRepositoryInterface } from '../../domain/ports/article-user-repository.interface';
import { Injectable } from '@nestjs/common';
import { ArticleUserEntity } from '../../domain/entities/article-user.entity';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../../domain/query/get-user-by-id.query';
import { UserEntity } from '../../../user/domain/entity/user.entity';

@Injectable()
export class ArticleUserRepository implements ArticleUserRepositoryInterface {
  public constructor(private readonly queryBus: QueryBus) {}

  public async findUserById(id: number): Promise<ArticleUserEntity> {
    const user: UserEntity = await this.queryBus.execute(
      new GetUserByIdQuery(id),
    );
    const articleUserEntity = new ArticleUserEntity();
    articleUserEntity.id = user.id;
    articleUserEntity.name = user.name;
    articleUserEntity.state = user.state;
    return articleUserEntity;
  }
}
