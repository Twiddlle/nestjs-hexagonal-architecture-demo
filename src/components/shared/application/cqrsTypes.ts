import { RESULT_TYPE_SYMBOL } from '@nestjs/cqrs/dist/classes/constants';

export type CommandType<T> = Omit<T, typeof RESULT_TYPE_SYMBOL>;
export type QueryType<T> = Omit<T, typeof RESULT_TYPE_SYMBOL>;
