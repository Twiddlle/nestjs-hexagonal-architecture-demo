import {
  Body,
  Controller,
  Get,
  Patch,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from '../../../domain/service/article.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { EntityPresenterMapper } from '../../../../../common/application/presenter/entity-presenter.mapper';
import { ArticleFullDto } from './dto/article-full.dto';
import { ArticleAggregate } from '../../../domain/aggregates/article.aggregate';
import { ArticleUpdateDto } from './dto/article-update.dto';
import { ValidationIntPipe } from '../../../../../common/application/pipe/ValidationIntPipe';
import { ArticleUpdateResultDto } from './dto/article-update-result.dto';

@Controller('article')
@ApiTags('Article')
export class ArticleController {
  private readonly entityMapper = new EntityPresenterMapper(
    ArticleAggregate,
    ArticleFullDto,
  );

  public constructor(private readonly articleService: ArticleService) {}

  @ApiOkResponse({ type: ArticleFullDto })
  @ApiQuery({ name: 'id', required: true })
  @ApiOperation({ operationId: 'findOneArticle' })
  @Get('/')
  public async findOne(@Query('id', new ValidationIntPipe()) id: number) {
    const articleEntity = await this.articleService.findById(id);
    return this.entityMapper.fromDomain(articleEntity);
  }

  @ApiOkResponse({ type: ArticleUpdateResultDto })
  @ApiQuery({ name: 'id', required: true })
  @ApiBody({ type: ArticleUpdateDto, required: true })
  @ApiOperation({ operationId: 'updateArticle' })
  @Patch('/')
  public async update(
    @Query('id', new ValidationIntPipe()) id: number,
    @Body(new ValidationPipe({ whitelist: true, transform: true }))
    article: ArticleUpdateDto,
  ) {
    const existingArticle = await this.articleService.findById(id);
    await this.articleService.save(
      Object.assign(existingArticle.article, article, { id }),
    );
    return new ArticleUpdateResultDto();
  }
}
