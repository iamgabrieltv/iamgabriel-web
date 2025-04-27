export const prerender = false;

import { getD1, getUtcNow } from '$lib/server/db';
import { desc, eq, isNotNull } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { guestbook } from '$lib/server/db/schema';
import { fetchUser, type UserData } from '$lib/server/fetchUser';
import { fail, redirect } from '@sveltejs/kit';
import {
	deleteSessionTokenCookie,
	invalidateAllSessions,
	invalidateSession
} from '$lib/server/auth/session';

export const load: PageServerLoad = async ({ platform, locals }) => {
	const db = getD1(platform!.env);

	const messages = await db.query.guestbook.findMany({
		columns: { id: true, user: true, message: true },
		where: isNotNull(guestbook.message),
		orderBy: desc(guestbook.createdAt)
	});

	const enrichedMessages = await Promise.all(
		messages.map(async (message) => {
			const userData = await fetchUser(message.user);
			return {
				...message,
				user: userData
			};
		})
	);

	let fetchedUser: UserData | undefined;

	if (locals.user !== null) {
		fetchedUser = await fetchUser(locals.user.user);
	}

	return {
		messages: enrichedMessages,
		user:
			locals.user === null
				? null
				: { name: fetchedUser?.name, dbId: locals.user?.user, emailHash: locals.user?.emailHash },
		title: 'Guestbook'
	};
};

export const actions = {
	signout: async (event) => {
		if (event.locals.session === null) {
			return fail(401);
		}
		await invalidateSession(event.locals.session.id, event.platform?.env);
		deleteSessionTokenCookie(event);
		return redirect(302, '/guestbook');
	},
	post: async (event) => {
		if (event.locals.session === null) {
			return fail(401);
		}
		const db = getD1(event.platform?.env);
		const formData = await event.request.formData();
		const message = formData.get('message');
		if (message === null) {
			return fail(400);
		}

		await db
			.update(guestbook)
			.set({ message: message as string, updatedAt: getUtcNow() })
			.where(eq(guestbook.id, event.locals.user!.id))
			.limit(1);

		return redirect(302, '/guestbook');
	},
	delete: async (event) => {
		if (event.locals.session === null) {
			return fail(401);
		}
		const db = getD1(event.platform?.env);

		await invalidateAllSessions(event.locals.user!.id, event.platform?.env);
		deleteSessionTokenCookie(event);
		await db.delete(guestbook).where(eq(guestbook.id, event.locals.user!.id)).limit(1);
		return redirect(302, '/guestbook');
	}
} satisfies Actions;
