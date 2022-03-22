import { ArticleEntity } from '../../../../domain/entities/article.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ArticleUpdateValidationDto extends ArticleEntity {
  @IsOptional()
  @IsNumber()
  public id: number;

  @IsOptional()
  @IsString()
  public title: string;

  @IsOptional()
  @IsString()
  public body: string;

  @IsOptional()
  @IsNumber()
  public userId: number;
}
