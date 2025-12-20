import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const postCreateRequestSchema = extendApi(
  z.object({
    title: z.string(),
    body: z.string(),
  }),
);

export class PostCreateRequestDto extends createZodDto(
  postCreateRequestSchema,
) {}
