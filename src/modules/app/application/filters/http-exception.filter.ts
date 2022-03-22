import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ArticleNotFoundException } from '../../../article/domain/exception/article-not-found.exception';
import { ArticleBaseException } from '../../../article/domain/exception/article-base.exception';
import { AppConfig } from '../../../../config/app.config';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch()
export class HttpExceptionFilter
  implements ExceptionFilter, GqlExceptionFilter
{
  private readonly logger = new Logger(HttpExceptionFilter.name);
  private readonly exceptionMapping = new Map();

  public constructor(private readonly appConfig: AppConfig) {
    this.exceptionMapping.set(ArticleNotFoundException, NotFoundException);
    this.exceptionMapping.set(ArticleBaseException, BadRequestException);
  }

  public catch(
    error: Error | HttpException | any,
    host: ArgumentsHost | any,
  ): any {
    const exception = this.mapException(error);
    if (host.contextType === 'graphql') {
      GqlArgumentsHost.create(host);
      return exception;
    }

    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    let resBody: any = {
      statusCode: 400,
      message: exception.message,
      error: exception.name,
    };
    if (exception instanceof HttpException) {
      if (exception.getResponse() instanceof Object) {
        resBody = exception.getResponse();
      } else {
        resBody.message = exception.getResponse();
      }
    }

    this.logger.error(`${resBody.message}`);

    res.status(resBody.statusCode || 400).json({
      ...resBody,
      stack: this.appConfig.isDev ? exception.stack : undefined,
    });
  }

  private mapException(exception: Error) {
    const mappedException = this.exceptionMapping.get(exception.constructor);
    if (mappedException) {
      return new mappedException(exception.message);
    }
    return exception;
  }
}
