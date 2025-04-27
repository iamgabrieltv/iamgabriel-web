import { generateState } from 'arctic';
import { github } from '$lib/server/auth/providers';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = (event) => {
	const state = generateState();
	const authUrl = github.createAuthorizationURL(state, ['user:email']);

	event.cookies.set('github_oauth_state', state, {
		path: '/',
		httpOnly: true,
		maxAge: 60 * 10,
		sameSite: 'lax'
	});

	return new Response(null, {
		status: 302,
		headers: {
			Location: authUrl.toString()
		}
	});
};
