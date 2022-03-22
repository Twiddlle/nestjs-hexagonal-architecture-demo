import { ArticleUserRepositoryInterface } from '../../domain/ports/article-user-repository.interface';
import { Injectable } from '@nestjs/common';
import { ArticleUserEntity } from '../../domain/entities/article-user.entity';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../../domain/query/get-user-by-id.query';

@Injectable()
export class ArticleUserRepository implements ArticleUserRepositoryInterface {
  public constructor(private readonly queryBus: QueryBus) {}

  public async findUserById(id: number): Promise<ArticleUserEntity> {
    return Object.assign(
      new ArticleUserEntity(),
      await this.queryBus.execute(new GetUserByIdQuery(id)),
    );
  }
}
