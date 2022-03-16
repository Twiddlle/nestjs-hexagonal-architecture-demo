import { ArticleDto } from './article.dto';
import { ArticleUserDto } from './article-user.dto';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class ArticleFullDto {
  @ApiModelProperty({ type: ArticleDto })
  public article: ArticleDto;

  @ApiModelProperty({ type: ArticleUserDto })
  public user: ArticleUserDto;
}
