import { ArticleEntity } from '../../../../domain/entities/article.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Type } from 'class-transformer';

export class ArticleDto {
  @ApiModelProperty({ readOnly: true })
  public id: number;

  @ApiModelProperty()
  public title: string;

  @ApiModelProperty()
  public body: string;

  @ApiModelProperty()
  public userId: number;

  @ApiModelProperty()
  @Type(() => Date)
  public createdAt: Date;

  @ApiModelProperty()
  @Type(() => Date)
  public updatedAt: Date;

  public static fromDomain(articleEntity: ArticleEntity): ArticleDto {
    const articleDto = new ArticleDto();
    articleDto.id = articleEntity.id;
    articleDto.title = articleEntity.title;
    articleDto.body = articleEntity.body;
    articleDto.userId = articleEntity.userId;
    articleDto.createdAt = articleEntity.createdAt;
    return articleDto;
  }
}
