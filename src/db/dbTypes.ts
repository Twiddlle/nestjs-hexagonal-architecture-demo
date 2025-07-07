import * as schema from 'src/db/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

export type DrizzleSchema = typeof schema;
export type DbType = NodePgDatabase<typeof schema>;
