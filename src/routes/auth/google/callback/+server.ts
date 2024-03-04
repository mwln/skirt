import { db } from '$lib/server/db';
import { google, lucia } from '$lib/server/auth';
import { users } from '$lib/server/schema';
import { OAuth2RequestError } from 'arctic';
import { generateId } from 'lucia';
import type { RequestEvent } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

export async function GET({ url, cookies }: RequestEvent) {
	const stateCookie = cookies.get('google_oauth_state');
	const codeVerifier = cookies.get('code_verifier');

	const state = url.searchParams.get('state');
	const code = url.searchParams.get('code');

	if (!state || !stateCookie || !code || stateCookie !== state || !codeVerifier) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await google.validateAuthorizationCode(code, codeVerifier);
		const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});

		const googleUser = (await response.json()) as GoogleUser;
		const existingUser = await db.query.users.findFirst({
			where: and(eq(users.provider, 'google'), eq(users.providerId, googleUser.id))
		});

		if (existingUser) {
			const session = await lucia.createSession(existingUser.id, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		} else {
			const userId = generateId(10);
			await db.insert(users).values({
				id: userId,
				provider: 'google',
				providerId: googleUser.id,
				email: googleUser.email,
				firstName: googleUser.given_name,
				lastName: googleUser.family_name
			});
			const session = await lucia.createSession(userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies.set(sessionCookie.name, sessionCookie.value, {
				path: '.',
				...sessionCookie.attributes
			});
		}
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch (e) {
		console.log(e);
		if (e instanceof OAuth2RequestError) {
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}

type GoogleUser = {
	id: string;
	email: string;
	verified_email: boolean;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
	locale: string;
};
