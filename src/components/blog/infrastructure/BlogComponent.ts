import { Module } from '@nestjs/common';
import { AdminComponent } from 'src/components/admin/infrastructure/AdminComponent';
import {
  DRIZZLE_PROVIDER,
  OrmModule,
} from 'src/modules/orm/infrastructure/OrmModule';
import { AppConfigModule } from 'src/modules/config/infrastructure/AppConfigModule';
import { PostController } from 'src/components/blog/infrastructure/http/rest/controllers/PostController';
import { CqrsModule } from '@nestjs/cqrs';
import { DbType } from 'src/db/dbTypes';
import { PostRepository } from 'src/components/blog/infrastructure/ports/persistence/PostRepository';
import { GetPostQueryHandler } from 'src/components/blog/application/queryHandlers/GetPostQueryHandler';
import { CreatePostCommandHandler } from 'src/components/blog/application/commandHandlers/CreatePostCommandHandler';

@Module({
  imports: [AdminComponent, OrmModule, AppConfigModule, CqrsModule],
  providers: [
    // repositories
    {
      provide: 'PostRepository',
      useFactory: (dbType: DbType) => {
        return new PostRepository(dbType);
      },
      inject: [DRIZZLE_PROVIDER],
    },

    // query handlers
    GetPostQueryHandler,

    // command handlers
    CreatePostCommandHandler,
  ],
  controllers: [PostController],
})
export class BlogComponent {}
