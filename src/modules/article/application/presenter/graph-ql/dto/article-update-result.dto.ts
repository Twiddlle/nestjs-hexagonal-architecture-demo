import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'ArticleUpdateResultDto' })
export class ArticleUpdateResultDto {
  @Field()
  public result: string = 'ok';
}
