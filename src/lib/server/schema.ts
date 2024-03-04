import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, primaryKey } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable(
	'users',
	{
		id: text('id').unique().notNull(),
		email: text('email').unique().notNull(),
		firstName: text('name').notNull(),
		lastName: text('last_name').notNull(),
		providerId: text('provider_id').notNull(),
		provider: text('provider').notNull()
	},
	(users) => ({
		pk: primaryKey({ columns: [users.provider, users.providerId] })
	})
);

export const session = sqliteTable('session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at').notNull()
});

// TODO: This is an example of more tables that could be added to the schema
export const posts = sqliteTable('posts', {
	id: integer('id').primaryKey(),
	title: text('title').notNull(),
	content: text('content').notNull(),
	userId: integer('user_id')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	createdAt: text('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull()
});
