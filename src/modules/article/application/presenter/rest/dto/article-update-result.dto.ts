import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class ArticleUpdateResultDto {
  @ApiModelProperty()
  public result = 'ok';
}
