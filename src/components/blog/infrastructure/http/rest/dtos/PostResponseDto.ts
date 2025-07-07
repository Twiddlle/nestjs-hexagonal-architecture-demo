import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const postResponseSchema = extendApi(
  z.object({
    id: z.number(),
    title: z.string(),
    body: z.string(),
    user: z.object({
      id: z.number(),
      name: z.string(),
    }),
    createdAt: z.date(),
    updatedAt: z.date(),
  }),
);

export class PostResponseDto extends createZodDto(postResponseSchema) {}
