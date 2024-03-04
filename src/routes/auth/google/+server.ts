import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';
import { generateState, generateCodeVerifier } from 'arctic';

import { google } from '$lib/server/auth';

export async function GET({ cookies }: RequestEvent): Promise<Response> {
	const state = generateState();
	const codeVerifier = generateCodeVerifier();
	const url = await google.createAuthorizationURL(state, codeVerifier, {
		scopes: ['openid', 'email', 'profile']
	});

	cookies.set('google_oauth_state', state, {
		httpOnly: true,
		sameSite: 'lax',
		secure: import.meta.env.PROD,
		maxAge: 60 * 10,
		path: '/'
	});

	cookies.set('code_verifier', codeVerifier, {
		httpOnly: true,
		sameSite: 'lax',
		secure: import.meta.env.PROD,
		maxAge: 60 * 10,
		path: '/'
	});

	redirect(302, url.toString());
}
