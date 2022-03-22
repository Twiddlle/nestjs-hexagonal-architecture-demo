import { ArticleEntity } from '../../../../domain/entities/article.entity';
import { Type } from 'class-transformer';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ArticleDto extends ArticleEntity {
  @Field()
  public id: number;

  @Field()
  public title: string;

  @Field()
  public body: string;

  @Field()
  public userId: number;

  @Field()
  @Type(() => Date)
  public createdAt: Date;

  @Field()
  @Type(() => Date)
  public updatedAt: Date;
}
