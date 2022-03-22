import { ArticleDto } from './article.dto';
import { ArticleUserDto } from './article-user.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ArticleFullDto {
  @Field()
  public article: ArticleDto;

  @Field()
  public user: ArticleUserDto;
}
