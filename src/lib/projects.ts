interface project {
	image: string;
	title: string;
	description: string;
	descriptionShort?: string;
	url?: string;
	repo?: string;
	icons?: string[];
}

export const projects: project[] = [
	{
		title: 'iamgabriel.dev',
		image: '/og.png',
		description:
			'My website, built with SvelteKit, Tailwind, Drizzle and Cloudflare D1. Hosted on Cloudflare Pages.',
		descriptionShort: "The website you're on right now! Built with SvelteKit.",
		url: 'https://github.com/iamgabrieltv/iamgabriel-web',
		repo: 'https://github.com/iamgabrieltv/iamgabriel-web',
		icons: [
			'devicon-plain:svelte',
			'mdi:tailwind',
			'devicon-plain:typescript',
			'lineicons:drizzle',
			'devicon-plain:sqlite',
			'devicon-plain:cloudflare'
		]
	},
	{
		title: 'Minecraft Plugins',
		image: '/assets/projects/plugins.webp',
		description:
			'I wrote two plugins so far: ColorfulAnvil enabling MiniMessage in Anvils and Chat, and DiscordPlayerList to display online players on Discord. Check them out by clicking on the title!',
		descriptionShort: 'I wrote two plugins so far. Check them out by clicking the title!',
		url: 'https://modrinth.com/user/iamgabrieltv',
		icons: ['devicon-plain:java']
	},
	{
		title: 'AAMRP',
		image: '/assets/projects/aamrp.avif',
		description: 'Animated Apple Music Rich Presence for Discord. Built with .NET',
		descriptionShort: 'Animated Apple Music Rich Presence for Discord.',
		url: 'https://github.com/iamgabrieltv/aamrp',
		repo: 'https://github.com/iamgabrieltv/aamrp',
		icons: ['simple-icons:dotnet', 'ic:baseline-discord']
	},
	{
		title: 'IamFaucet',
		image: '/assets/projects/iamfaucet.webp',
		description: 'Frontend for my Banano Cryptocurrency Faucet, built with SvelteKit and Tailwind.',
		descriptionShort: 'My Banano Crypto Faucet.',
		url: 'https://faucet.iamgabriel.dev/',
		repo: 'https://github.com/iamgabrieltv/iamfaucet',
		icons: [
			'devicon-plain:svelte',
			'devicon-plain:typescript',
			'mdi:tailwind',
			'devicon-plain:cloudflare'
		]
	},
	{
		title: 'BuyableCat',
		image: 'https://gcdn.thunderstore.io/live/repository/icons/IamGabriel-BuyableCat-2.0.4.png',
		description: 'A mod for Lethal Company that allows you to buy a cat from the shop.',
		url: 'https://thunderstore.io/c/lethal-company/p/IamGabriel/BuyableCat/',
		repo: 'https://github.com/iamgabrieltv/BuyableCat',
		icons: ['devicon-plain:csharp', 'simple-icons:thunderstore']
	},
	{
		title: 'IamChat',
		image: '/assets/projects/iamchat.webp',
		description:
			'My school banned discord, so I built my own chat app using PocketBase as backend and SvelteKit for frontend.',
		descriptionShort: 'My school banned discord, so I built my own chat app.',
		url: 'https://github.com/iamgabrieltv/IamChat',
		repo: 'https://github.com/iamgabrieltv/IamChat',
		icons: [
			'devicon-plain:svelte',
			'devicon-plain:typescript',
			'mdi:tailwind',
			'simple-icons:pocketbase',
			'devicon-plain:cloudflare'
		]
	},
	{
		title: 'IamBot',
		image: '/assets/projects/iambot.webp',
		description: '[ARCHIVE] One of my first JavaScript projects. A private discord.js bot.',
		url: 'https://github.com/iamgabrieltv/IamBot',
		repo: 'https://github.com/iamgabrieltv/IamBot',
		icons: ['devicon-plain:javascript', 'ic:baseline-discord']
	}
];
