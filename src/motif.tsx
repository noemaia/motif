import { CSSProperties } from '@vanilla-extract/css';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import clsx from 'clsx';
import { ComponentPropsWithRef, JSX, useMemo } from 'react';
import { CSSProps, MotifStyle } from './motif-style.js';
import { categorizeProps, resolveValue } from './utils.js';

export type Elements = keyof JSX.IntrinsicElements;

export type SprinklesFn<Props = any> = {
	(props: Props): string;
	properties: Set<string>;
};

export type SprinklesProps<S> = S extends SprinklesFn<infer P> ? P : never;

export type CSSPropertiesSubset<P extends CSSProps> = {
	[K in P]?: K extends keyof CSSProperties ? CSSProperties[K] : never;
};
export type Shorthands<SH extends string> = {
	[K in SH]?: string | number | undefined | null;
};

export type MotifProps<
	E extends Elements,
	S extends SprinklesFn,
	P extends CSSProps = never,
	SH extends string = never,
> = ComponentPropsWithRef<E> & {
	inlineVars?: Record<string, string | undefined | null>;
} & CSSPropertiesSubset<P> &
	Shorthands<SH> &
	SprinklesProps<S>;

export function motif<
	E extends Elements,
	S extends SprinklesFn,
	P extends CSSProps,
	SH extends string = string,
>(element: E, sprinkles: S, config: MotifStyle<P, SH>) {
	return (props: MotifProps<E, S, P, SH>) => {
		const { className, style, inlineVars, ...allProps } = props;
		const Comp: any = element;

		const processedProps = useMemo(() => {
			const { sprinkled, primitive, shorthands, rest } = categorizeProps(
				allProps,
				sprinkles.properties,
				config,
			);
			const vars: Record<string, string> = {};
			const styleClassNames: string[] = [];

			for (const [key, value] of Object.entries(primitive)) {
				if (value === null) {
					continue;
				}

				const cssVar = config.refs[key as keyof typeof config.refs];
				vars[cssVar] = resolveValue(key, value);

				styleClassNames.push(
					config.classNames[key as keyof typeof config.classNames],
				);
			}

			for (const [shorthand, value] of Object.entries(shorthands)) {
				if (value === null) {
					continue;
				}

				const properties = config.shorthands?.[shorthand as SH] || [];

				for (const prop of properties) {
					if (prop in config.refs) {
						const cssVar = config.refs[prop as keyof typeof config.refs];
						vars[cssVar] = resolveValue(prop, value);

						styleClassNames.push(
							config.classNames[prop as keyof typeof config.classNames],
						);
					}
				}
			}

			return {
				style: {
					...style,
					...assignInlineVars(inlineVars ?? {}),
					...assignInlineVars(vars),
				},
				className: clsx(
					config.baseClassName,
					sprinkles(sprinkled),
					styleClassNames,
					className,
				),
				...rest,
			};
		}, [allProps, className, style, inlineVars]);

		return <Comp {...processedProps} />;
	};
}
