import { Controller, Get, Query } from '@nestjs/common';
import { ArticleService } from '../../../domain/service/article.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { EntityPresenterMapper } from '../../../../../common/application/presenter/entity-presenter.mapper';
import { ArticleEntity } from '../../../domain/entities/article.entity';
import { ArticleDto } from './dto/article.dto';

@Controller('article')
@ApiTags('Article')
export class ArticleController {
  private readonly entityMapper = new EntityPresenterMapper(
    ArticleEntity,
    ArticleDto,
  );

  public constructor(private readonly articleService: ArticleService) {}

  @ApiOkResponse({ type: ArticleDto })
  @ApiQuery({ name: 'id', required: true })
  @ApiOperation({ operationId: 'findArticleById' })
  @Get('/')
  public async findById(@Query('id') id: number) {
    const articleEntity = await this.articleService.findById(id);
    return this.entityMapper.fromDomain(articleEntity);
  }
}
