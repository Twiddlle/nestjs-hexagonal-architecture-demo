import { ApiModelPropertyOptional } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ArticleUpdateValidationDto } from '../../common/dto/article-update.validation.dto';

export class ArticleUpdateDto extends ArticleUpdateValidationDto {
  @ApiModelPropertyOptional()
  public title: string;

  @ApiModelPropertyOptional()
  public body: string;

  @ApiModelPropertyOptional()
  public userId: number;
}
