import { ArticleUserEntity } from '../../../../domain/entities/article-user.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class ArticleUserDto extends ArticleUserEntity {
  @ApiModelProperty({ readOnly: true })
  public id: number;

  @ApiModelProperty({ readOnly: true })
  public name: string;
}
