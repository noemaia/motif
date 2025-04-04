import { useMemo } from 'react';
import { alignmentProps } from './flex.js';
import { SprinkledProperties } from './primitives.css.js';
import { Primitive, PrimitiveProps } from './primitives.js';

const gridProps = {
	justifyItemsStart: { justifyItems: 'start' },
	justifyItemsCenter: { justifyItems: 'center' },
	justifyItemsEnd: { justifyItems: 'end' },
	justifyItemsStretch: { justifyItems: 'stretch' },
	contentNormal: { alignContent: 'normal' },
	contentStart: { alignContent: 'flex-start' },
	contentCenter: { alignContent: 'center' },
	contentEnd: { alignContent: 'flex-end' },
	contentBetween: { alignContent: 'space-between' },
	contentAround: { alignContent: 'space-around' },
	...alignmentProps,
};

type GridShorthandProps<Type> = {
	[Property in keyof Type]?: boolean;
};

export type PrimitiveGridProps = Omit<
	PrimitiveProps['div'],
	| 'display'
	| 'gridTemplateColumns'
	| 'gridTemplateRows'
	| 'gridTemplateAreas'
	| 'justifyItems'
	| 'alignItems'
> & {
	cols?: number | string;
	rows?: number | string;
	templateAreas?: string;
} & GridShorthandProps<typeof gridProps>;

export function Grid({
	children,
	cols,
	rows,
	templateAreas,
	...props
}: PrimitiveGridProps) {
	const sprinklesProps = useMemo((): SprinkledProperties => {
		let primitiveProps: Record<string, any> = {
			...(cols && {
				gridTemplateColumns:
					typeof cols === 'number' ? `repeat(${cols}, 1fr)` : cols,
			}),
			...(rows && {
				gridTemplateRows:
					typeof rows === 'number' ? `repeat(${rows}, 1fr)` : rows,
			}),
			...(templateAreas && { gridTemplateAreas: templateAreas }),
		};

		for (const prop in props) {
			if (prop in gridProps) {
				primitiveProps = {
					...primitiveProps,
					...gridProps[prop as keyof typeof gridProps],
				};
			} else {
				primitiveProps[prop] = props[prop as keyof typeof props];
			}
		}
		return primitiveProps;
	}, [cols, rows, templateAreas, props]);

	return (
		<Primitive.div {...sprinklesProps} display="grid">
			{children}
		</Primitive.div>
	);
}
