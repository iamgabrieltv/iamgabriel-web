import {
	generateSessionToken,
	createSession,
	setSessionTokenCookie
} from '$lib/server/auth/session';
import { discord } from '$lib/server/auth/providers';
import { getD1 } from '$lib/server/db';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { error } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import type { OAuth2Tokens } from 'arctic';
import type { DiscordResponse } from '$lib/server/fetchUser';
import { guestbook } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async (event) => {
	const db = getD1(event.platform?.env);

	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('discord_oauth_state') ?? null;
	if (code === null || state === null || storedState === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await discord.validateAuthorizationCode(code, null);
	} catch (e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 400
		});
	}
	const discordUserResponse = await fetch('https://discord.com/api/v10/users/@me', {
		headers: {
			Authorization: `Bearer ${tokens.accessToken()}`
		}
	});
	const discordUser = (await discordUserResponse.json()) as DiscordResponse;
	const discordUserId = discordUser.id;
	const discordUserEmail = discordUser.email ?? null;

	const existingUser = await db
		.select()
		.from(guestbook)
		.where(eq(guestbook.user, `discord:${discordUserId}`))
		.limit(1);

	if (existingUser.length === 1) {
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, existingUser[0].id, event.platform?.env);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/guestbook'
			}
		});
	}

	try {
		const user = await db
			.insert(guestbook)
			.values({
				user: `discord:${discordUserId}`,
				emailHash:
					discordUserEmail !== null
						? encodeHexLowerCase(sha256(new TextEncoder().encode(discordUserEmail)))
						: ''
			})
			.returning();
		const sessionToken = generateSessionToken();
		const session = await createSession(sessionToken, user[0].id, event.platform?.env);
		setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return new Response(null, {
			status: 302,
			headers: {
				Location: '/guestbook'
			}
		});
	} catch (e) {
		error(
			400,
			'Could not create account. You may already have an account with GitHub. Try signing in with GitHub.'
		);
	}
};
