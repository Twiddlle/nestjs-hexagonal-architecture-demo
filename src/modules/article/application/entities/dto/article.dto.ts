import { ArticleEntity } from '../../../domain/entities/article.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Type } from 'class-transformer';

export class ArticleDto extends ArticleEntity {
  @ApiModelProperty({ readOnly: true })
  public id: number;

  @ApiModelProperty()
  public title: string;

  @ApiModelProperty()
  public body: string;

  @ApiModelProperty()
  public userId: string;

  @ApiModelProperty()
  @Type(() => Date)
  public createdAt: Date;

  @ApiModelProperty()
  @Type(() => Date)
  public updatedAt: Date;
}
