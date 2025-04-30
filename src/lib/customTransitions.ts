import type { TransitionConfig } from 'svelte/transition';

function isEven(input: number) {
	return input % 2 === 0;
}

export function typewriter(node: Element, { speed = 1 } = {}): TransitionConfig {
	const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

	if (!valid) {
		throw new Error(`This transition only works on elements with a single text node child`);
	}

	const text = node.textContent;
	const duration = text!.length / (speed * 0.01);

	return {
		duration,
		tick: (t: number) => {
			const i = Math.trunc(text!.length * t);
			node.textContent = `${text!.slice(0, i)}${t !== 1 ? '_' : ''}`;
		}
	};
}
