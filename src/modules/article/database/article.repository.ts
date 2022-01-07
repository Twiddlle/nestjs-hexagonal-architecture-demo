import { ArticleRepositoryPort } from './article.repository.port';
import { Repository } from 'typeorm';
import { ArticleOrmEntity } from './article.orm-entity';
import { EntityMapper } from '../../../packages/infrastructure/database/entity.mapper';
import { ArticleEntity } from '../domain/entities/article.entity';
import { TypeormRepositoryBase } from '../../../packages/infrastructure/database/repository/typeorm.repository.base';

export class ArticleRepository
  extends TypeormRepositoryBase<ArticleEntity, ArticleOrmEntity>
  implements ArticleRepositoryPort
{
  public constructor(
    private readonly userRepository: Repository<ArticleOrmEntity>,
  ) {
    super(
      userRepository,
      new EntityMapper<ArticleEntity, ArticleOrmEntity>(
        ArticleEntity,
        ArticleOrmEntity,
      ),
    );
  }
}
