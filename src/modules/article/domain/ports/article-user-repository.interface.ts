import { ArticleUserEntity } from '../entities/article-user.entity';

export interface ArticleUserRepositoryInterface {
  findUserById(id: number): Promise<ArticleUserEntity>;
}
