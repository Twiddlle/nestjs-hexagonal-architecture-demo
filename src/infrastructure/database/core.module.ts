import { Module, Provider } from '@nestjs/common';
import { articleRepository } from './repository.provider';

const providers: Provider[] = [articleRepository];

@Module({
  providers: providers,
  exports: providers,
})
export class CoreModule {}
