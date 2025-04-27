import { generateState } from 'arctic';
import { discord } from '$lib/server/auth/providers';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = (event) => {
	const state = generateState();
	const authUrl = discord.createAuthorizationURL(state, null, ['email', 'identify']);

	event.cookies.set('discord_oauth_state', state, {
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
