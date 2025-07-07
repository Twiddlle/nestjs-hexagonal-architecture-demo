import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { UserRole } from 'src/components/admin/domain/entities/User';

export const users = pgTable('Users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).notNull(),
  role: varchar('role', { length: 256 }).$type<UserRole>().notNull(),
});

export const posts = pgTable('Posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  body: varchar('body', { length: 256 }).notNull(),
  userId: integer('user_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
    .notNull()
    .$onUpdate(() => new Date())
    .defaultNow(),
});
