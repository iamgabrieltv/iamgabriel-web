interface project {
	id: number;
	image: string;
	title: string;
	description: string;
	descriptionShort?: string;
	url?: string;
	repo?: string;
}

export const projects: project[] = [
	{
		id: 1,
		title: 'iamgabriel.dev',
		image: '/og.png',
		description:
			'My website, built with SvelteKit, Tailwind, Drizzle and Cloudflare D1. Hosted on Cloudflare Pages.',
		descriptionShort: "The website you're on right now! Built with SvelteKit.",
		url: 'https://github.com/iamgabrieltv/iamgabriel-web',
		repo: 'https://github.com/iamgabrieltv/iamgabriel-web'
	},
	{
		id: 2,
		title: 'IamFaucet',
		image: '/assets/projects/iamfaucet.webp',
		description: 'Frontend for my Banano Cryptocurrency Faucet, built with SvelteKit and Tailwind.',
		descriptionShort: 'My Banano Crypto Faucet.',
		url: 'https://faucet.iamgabriel.dev/',
		repo: 'https://github.com/iamgabrieltv/iamfaucet'
	},
	{
		id: 3,
		title: 'BuyableCat',
		image: 'https://gcdn.thunderstore.io/live/repository/icons/IamGabriel-BuyableCat-2.0.4.png',
		description: 'A mod for Lethal Company that allows you to buy a cat from the shop.',
		url: 'https://thunderstore.io/c/lethal-company/p/IamGabriel/BuyableCat/',
		repo: 'https://github.com/iamgabrieltv/BuyableCat'
	}
];
