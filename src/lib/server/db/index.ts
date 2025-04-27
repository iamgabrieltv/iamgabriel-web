import { drizzle } from 'drizzle-orm/d1';

import * as schema from './schema';

export function getUtcNow() {
	const date = new Date();
	return new Date(date.toISOString());
}

export function getD1(env: App.Platform['env']) {
	const db = drizzle(env!.DB, { schema });
	return db;
}
