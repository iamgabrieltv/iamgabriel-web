interface project {
	image: string;
	title: string;
	description: string;
	descriptionShort?: string;
	url?: string;
	repo?: string;
}

export const projects: project[] = [
	{
		title: 'iamgabriel.dev',
		image: '/og.png',
		description:
			'My website, built with SvelteKit, Tailwind, Drizzle and Cloudflare D1. Hosted on Cloudflare Pages.',
		descriptionShort: "The website you're on right now! Built with SvelteKit.",
		url: 'https://github.com/iamgabrieltv/iamgabriel-web',
		repo: 'https://github.com/iamgabrieltv/iamgabriel-web'
	},
	{
		title: 'AAMRP',
		image: '/assets/projects/aamrp.avif',
		description: 'Animated Apple Music Rich Presence for Discord. Built with .NET',
		descriptionShort: 'Animated Apple Music Rich Presence for Discord.',
		url: 'https://github.com/iamgabrieltv/aamrp',
		repo: 'https://github.com/iamgabrieltv/aamrp'
	},
	{
		title: 'IamFaucet',
		image: '/assets/projects/iamfaucet.webp',
		description: 'Frontend for my Banano Cryptocurrency Faucet, built with SvelteKit and Tailwind.',
		descriptionShort: 'My Banano Crypto Faucet.',
		url: 'https://faucet.iamgabriel.dev/',
		repo: 'https://github.com/iamgabrieltv/iamfaucet'
	},
	{
		title: 'BuyableCat',
		image: 'https://gcdn.thunderstore.io/live/repository/icons/IamGabriel-BuyableCat-2.0.4.png',
		description: 'A mod for Lethal Company that allows you to buy a cat from the shop.',
		url: 'https://thunderstore.io/c/lethal-company/p/IamGabriel/BuyableCat/',
		repo: 'https://github.com/iamgabrieltv/BuyableCat'
	},
	{
		title: 'IamChat',
		image: '/assets/projects/iamchat.webp',
		description:
			'My school banned discord, so I built my own chat app using PocketBase as backend and SvelteKit for frontend.',
		descriptionShort: 'My school banned discord, so I built my own chat app.',
		url: 'https://github.com/iamgabrieltv/IamChat',
		repo: 'https://github.com/iamgabrieltv/IamChat'
	},
	{
		title: 'IamBot',
		image: '/assets/projects/iambot.webp',
		description: '[ARCHIVE] One of my first JavaScript projects. A private discord.js bot.',
		url: 'https://github.com/iamgabrieltv/IamBot',
		repo: 'https://github.com/iamgabrieltv/IamBot'
	}
];
