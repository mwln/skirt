import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { TURSO_DB_URL, TURSO_DB_TOKEN } from '$env/static/private';
import * as schema from './schema';

export const credentials = {
	url: TURSO_DB_URL,
	authToken: TURSO_DB_TOKEN
};

const client = createClient(credentials);

export const db = drizzle(client, { schema });
