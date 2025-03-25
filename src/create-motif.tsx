import { ComponentType } from 'react';
import { CSSProps, MotifStyle } from './motif-style.js';
import { Elements, motif, SprinklesFn } from './motif.js';

export function createMotif<
	E extends readonly Elements[],
	S extends SprinklesFn,
	P extends CSSProps,
	SH extends string = string,
>(elements: E, sprinkles: S, config: MotifStyle<P, SH>) {
	const components: Record<string, any> = {};

	for (const element of elements) {
		components[element] = motif(element, sprinkles, config);
	}

	return components as {
		[K in E[number]]: ReturnType<typeof motif<K, S, P, SH>>;
	};
}

export type MotifComponents<Components> = {
	[E in keyof Components]: Components[E] extends ComponentType<infer P>
		? P
		: never;
};
