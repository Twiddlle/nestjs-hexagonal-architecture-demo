import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const postCreateResponseSchema = extendApi(
  z.object({
    id: z.number(),
  }),
);

export class PostCreateResponseDto extends createZodDto(
  postCreateResponseSchema,
) {}
