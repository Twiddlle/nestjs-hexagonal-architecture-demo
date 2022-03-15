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
import { AppConfig } from '../../infrastructure/app.config';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);
  private readonly exceptionMapping = new Map();

  public constructor(private readonly appConfig: AppConfig) {
    this.exceptionMapping.set(ArticleNotFoundException, NotFoundException);
    this.exceptionMapping.set(ArticleBaseException, BadRequestException);
  }

  public catch(error: Error | HttpException | any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    let status = 400;
    const exception = this.mapException(error);
    const name = exception.name;
    let response: any = exception.message;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      response = exception.getResponse();
      res.status(status).json({
        ...response,
        stack: this.appConfig.isDev ? exception.stack : undefined,
      });
    }

    this.logger.error(`${name}: ${response}`);

    res.status(status).json({
      name,
      response,
      stack: exception.stack,
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
