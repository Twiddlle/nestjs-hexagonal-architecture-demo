import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

interface IResponse {
  message?: string | Record<string, unknown> | Array<unknown>;
}

export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    let status = 500;
    let message: unknown = 'Internal server error';
    const timestamp = new Date().toISOString();

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse() as IResponse | string;
      if (typeof response === 'string') {
        message = response;
      } else {
        message = response.message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      statusCode: status,
      type: 'ERROR',
      timestamp: timestamp,
      messages:
        message instanceof Array ? message : [{ type: 'ERROR', message }],
      path: request.url,
    });
  }
}
