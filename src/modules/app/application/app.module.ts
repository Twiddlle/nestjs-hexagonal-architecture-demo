import { Module } from '@nestjs/common';
import { ArticleModule } from '../../article/article.module';
import { UserModule } from '../../user/user.module';

@Module({
  imports: [ArticleModule, UserModule],
})
export class AppModule {}
