import { DISCORD_BOT_TOKEN } from '$env/static/private';

export interface GitHubResponse {
	name: string | null;
	login: string;
	html_url: string;
	avatar_url: string;
	id: number;
	email: string | null;
}

export interface DiscordResponse {
	id: string;
	username: string;
	global_name: string | null;
	avatar: string;
	email: string | null;
}

export interface UserData {
	name: string;
	url: string;
	avatar: string;
}

export async function fetchUser(user: string): Promise<UserData> {
	const [provider, userId] = user.split(':');

	if (provider === 'github') {
		const data = await fetch(`https://api.github.com/user/${userId}`, {
			headers: {
				'User-Agent': 'iamgabriel-web'
			}
		}).then((res) => res.json() as Promise<GitHubResponse>);

		return {
			name: data.name ?? data.login,
			url: data.html_url,
			avatar: `${data.avatar_url}&s=48`
		};
	}

	if (provider === 'discord') {
		const data = await fetch(`https://discord.com/api/v10/users/${userId}`, {
			headers: {
				Authorization: `Bot ${DISCORD_BOT_TOKEN}`
			}
		}).then((res) => res.json() as Promise<DiscordResponse>);

		return {
			name: data.global_name ?? data.username,
			url: `https://discord.com/users/${data.id}`,
			avatar: `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png?size=48`
		};
	}

	throw new Error('Unknown Provider');
}
