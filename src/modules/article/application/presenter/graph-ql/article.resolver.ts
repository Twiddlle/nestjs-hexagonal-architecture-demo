import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { ArticleUpdateDto } from './dto/article-update.dto';
import { ArticleService } from '../../../domain/service/article.service';
import { ValidationIntPipe } from '../../../../../common/application/pipe/ValidationIntPipe';
import { ArticleUpdateResultDto } from './dto/article-update-result.dto';
import { ArticleFullDto } from './dto/article-full.dto';
import { EntityPresenterMapper } from '../../../../../common/application/presenter/entity-presenter.mapper';
import { ArticleAggregate } from '../../../domain/aggregates/article.aggregate';
import { ValidationPipe } from '@nestjs/common';

@Resolver(() => ArticleUpdateDto)
export class ArticleResolver {
  private readonly entityMapper = new EntityPresenterMapper(
    ArticleAggregate,
    ArticleFullDto,
  );

  public constructor(private readonly articleService: ArticleService) {}

  @Query(() => ArticleFullDto)
  public async findOne(
    @Args('articleUpdateDto', new ValidationIntPipe())
    id: number,
  ) {
    const articleEntity = await this.articleService.findById(id);
    return this.entityMapper.fromDomain(articleEntity);
  }

  @Mutation(() => ArticleUpdateResultDto)
  public async update(
    @Args('id', new ValidationIntPipe())
    id: number,
    @Args(
      'articleUpdateDto',
      new ValidationPipe({ whitelist: true, transform: true }),
    )
    article: ArticleUpdateDto,
  ) {
    const existingArticle = await this.articleService.findById(id);
    await this.articleService.save(
      Object.assign(existingArticle.article, article, { id }),
    );
    return new ArticleUpdateResultDto();
  }
}
