import { ArticleUserEntity } from '../../../../domain/entities/article-user.entity';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class ArticleUserDto {
  @ApiModelProperty({ readOnly: true })
  public id: number;

  @ApiModelProperty({ readOnly: true })
  public name: string;

  public static fromDomain(
    articleUserEntity: ArticleUserEntity,
  ): ArticleUserDto {
    const articleUserDto = new ArticleUserDto();
    articleUserDto.id = articleUserEntity.id;
    articleUserDto.name = articleUserEntity.name;
    return articleUserDto;
  }
}
