import { guestbook, sessionTable, type Session, type User } from '$lib/server/db/schema';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sha256 } from '@oslojs/crypto/sha2';
import { getD1 } from '../db';
import { eq } from 'drizzle-orm';
import type { RequestEvent } from '@sveltejs/kit';

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export async function createSession(
	token: string,
	userId: number,
	env: App.Platform['env']
): Promise<Session> {
	const db = getD1(env);
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};
	await db.insert(sessionTable).values(session);
	return session;
}

export async function validateSessionToken(
	token: string,
	env: App.Platform['env']
): Promise<SessionValidationResult> {
	const db = getD1(env);
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const result = await db
		.select({ user: guestbook, session: sessionTable })
		.from(sessionTable)
		.innerJoin(guestbook, eq(sessionTable.userId, guestbook.id))
		.where(eq(sessionTable.id, sessionId));
	if (result.length < 1) {
		return { session: null, user: null };
	}
	const { user, session } = result[0];
	if (Date.now() >= session.expiresAt.getTime()) {
		await db.delete(sessionTable).where(eq(sessionTable.id, session.id));
		return { session: null, user: null };
	}
	if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
		session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		await db
			.update(sessionTable)
			.set({ expiresAt: session.expiresAt })
			.where(eq(sessionTable.id, session.id));
	}
	return { session, user };
}

export async function invalidateSession(
	sessionId: string,
	env: App.Platform['env']
): Promise<void> {
	const db = getD1(env);
	await db.delete(sessionTable).where(eq(sessionTable.id, sessionId));
}

export async function invalidateAllSessions(
	userId: number,
	env: App.Platform['env']
): Promise<void> {
	const db = getD1(env);
	await db.delete(sessionTable).where(eq(sessionTable.userId, userId));
}

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
	event.cookies.set('session', token, {
		httpOnly: true,
		sameSite: 'lax',
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent): void {
	event.cookies.set('session', '', {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 0,
		path: '/'
	});
}

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };
