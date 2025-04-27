import {
	generateSessionToken,
	createSession,
	setSessionTokenCookie
} from '$lib/server/auth/session';
import { github } from '$lib/server/auth/providers';
import { getD1 } from '$lib/server/db';
import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';
import { error } from '@sveltejs/kit';

import type { RequestHandler } from './$types';
import type { OAuth2Tokens } from 'arctic';
import type { GitHubResponse } from '$lib/server/fetchUser';
import { guestbook } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const GET: RequestHandler = async (event) => {
	const db = getD1(event.platform?.env);

	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;
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
		tokens = await github.validateAuthorizationCode(code);
	} catch (e) {
		// Invalid code or client credentials
		return new Response(null, {
			status: 400
		});
	}
	const githubUserResponse = await fetch('https://api.github.com/user', {
		headers: {
			Authorization: `Bearer ${tokens.accessToken()}`,
			'User-Agent': 'iamgabriel-web'
		}
	});
	const githubUser = (await githubUserResponse.json()) as GitHubResponse;
	const githubUserId = githubUser.id;

	const githubEmailResponse = await fetch('https://api.github.com/user/emails', {
		headers: {
			Authorization: `Bearer ${tokens.accessToken()}`,
			'User-Agent': 'iamgabriel-web'
		}
	});
	const githubUserEmailArray = (await githubEmailResponse.json()) as GitHubEmail[];
	const githubUserEmail = githubUserEmailArray.find((email) => email.primary)?.email ?? null;

	const existingUser = await db
		.select()
		.from(guestbook)
		.where(eq(guestbook.user, `github:${githubUserId}`))
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
				user: `github:${githubUserId}`,
				emailHash:
					githubUserEmail !== null
						? encodeHexLowerCase(sha256(new TextEncoder().encode(githubUserEmail)))
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
			'Could not create Account. You may already have an account with Discord. Try signing in with Discord.'
		);
	}
};

interface GitHubEmail {
	email: string;
	verified: boolean;
	primary: boolean;
}
