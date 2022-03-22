import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ArticleModule } from '../../article/article.module';
import { UserModule } from '../../user/user.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),

    ArticleModule,
    UserModule,
  ],
})
export class AppModule {}
