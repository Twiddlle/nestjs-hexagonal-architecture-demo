import { z } from 'zod';

export const appConfigEnvSchema = z.object({
  APP_VERSION: z.string().default('v1'),
  APP_PORT: z.coerce.number().default(3000),
  DB_CONNECTION_STRING: z.string(),
});
