import { Module } from '@nestjs/common';
import { CoreModule } from '../../infrastructure/database/core.module';

@Module({
  imports: [CoreModule],
})
export class ArticleModule {}
