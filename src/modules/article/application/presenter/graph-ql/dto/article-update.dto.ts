import { ArticleUpdateValidationDto } from '../../common/dto/article-update.validation.dto';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ArticleUpdateDto extends ArticleUpdateValidationDto {
  @Field({ nullable: true })
  public title: string;

  @Field({ nullable: true })
  public body: string;

  @Field({ nullable: true })
  public userId: number;
}
