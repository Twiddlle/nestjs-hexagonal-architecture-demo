import { ArticleDto } from './article.dto';
import { ArticleUserDto } from './article-user.dto';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ArticleAggregate } from '../../../../domain/aggregates/article.aggregate';

export class ArticleFullDto {
  @ApiModelProperty({ type: ArticleDto })
  public article: ArticleDto;

  @ApiModelProperty({ type: ArticleUserDto })
  public user: ArticleUserDto;

  public static fromDomain(articleAggregate: ArticleAggregate): ArticleFullDto {
    const articleFullDto = new ArticleFullDto();
    articleFullDto.article = ArticleDto.fromDomain(articleAggregate.article);
    articleFullDto.user = ArticleUserDto.fromDomain(articleAggregate.user);
    return articleFullDto;
  }
}
