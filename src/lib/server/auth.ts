import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { db } from './db';
import { session, users } from './schema';
import { Google } from 'arctic';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

const adapter = new DrizzleSQLiteAdapter(db, session, users);

// TODO: replace with your own base URL for production
const baseUrl = dev ? 'http://localhost:5173' : 'https://example.com';

enum AuthProvider {
	Google = 'google'
}

function getRedirectUri(provider: AuthProvider) {
	return `${baseUrl}/auth/${provider}/callback`;
}

export const google = new Google(
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	getRedirectUri(AuthProvider.Google)
);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
	getUserAttributes: (attributes) => {
		return {
			email: attributes.email,
			firstName: attributes.firstName,
			lastName: attributes.lastName
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			firstName: string;
			lastName: string;
			email: string;
		};
	}
}
