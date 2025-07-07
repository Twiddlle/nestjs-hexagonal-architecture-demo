import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/components/shared/infrastructure/http/HttpExceptionFilter';

@Module({
  providers: [
    // filters
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class SharedComponent {}
