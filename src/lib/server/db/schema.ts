import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import type { InferSelectModel } from 'drizzle-orm';

export const guestbook = sqliteTable('guestbook', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	user: text('user').notNull(),
	message: text('message'),
	emailHash: text('email_hash').notNull().unique(),
	createdAt: integer('created_at', { mode: 'timestamp_ms' })
		.notNull()
		.$defaultFn(() => {
			const date = new Date();
			return new Date(date.toISOString());
		}),
	updatedAt: integer('updated_at', { mode: 'timestamp_ms' })
});

export const sessionTable = sqliteTable('session', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => guestbook.id),
	expiresAt: integer('expires_at', {
		mode: 'timestamp'
	}).notNull()
});

export type Session = InferSelectModel<typeof sessionTable>;
export type User = InferSelectModel<typeof guestbook>;
