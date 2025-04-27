import { GitHub, Discord } from 'arctic';
import {
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	ORIGIN
} from '$env/static/private';

export const github = new GitHub(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, null);
export const discord = new Discord(
	DISCORD_CLIENT_ID,
	DISCORD_CLIENT_SECRET,
	new URL('/login/discord/callback', ORIGIN).toString()
);
