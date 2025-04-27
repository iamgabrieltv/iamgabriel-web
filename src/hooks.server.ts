import {
	validateSessionToken,
	setSessionTokenCookie,
	deleteSessionTokenCookie
} from '$lib/server/auth/session';

import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/guestbook')) {
		const token = event.cookies.get('session') ?? null;
		if (token === null) {
			event.locals.user = null;
			event.locals.session = null;
			return resolve(event);
		}

		const { session, user } = await validateSessionToken(token, event.platform?.env);
		if (session !== null) {
			setSessionTokenCookie(event, token, session.expiresAt);
		} else {
			deleteSessionTokenCookie(event);
		}

		event.locals.session = session;
		event.locals.user = user;
		return resolve(event);
	}

	return resolve(event);
};
