import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const inquiries = sqliteTable('inquiries', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  company: text('company').notNull().default(''),
  email: text('email').notNull(),
  phone: text('phone').notNull().default(''),
  service: text('service').notNull(),
  budget: text('budget').notNull(),
  message: text('message').notNull(),
  status: text('status').notNull().default('new'),
  createdAt: text('created_at').notNull(),
  sourceHash: text('source_hash').notNull(),
});
