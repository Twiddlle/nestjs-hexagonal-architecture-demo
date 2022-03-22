import { ArticleUserEntity } from '../../../../domain/entities/article-user.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ArticleUserDto extends ArticleUserEntity {
  @Field()
  public id: number;

  @Field()
  public name: string;
}
