import { useMemo } from 'react';
import { SprinkledProperties } from './primitives.css.js';
import { Primitive, PrimitiveProps } from './primitives.js';

type FlexShorthandProps<Type> = {
	[Property in keyof Type]?: boolean;
};

export type PrimitiveFlexProps = Omit<
	PrimitiveProps['div'],
	| 'display'
	| 'flex'
	| 'flexDirection'
	| 'justifyContent'
	| 'alignItems'
	| 'flexWrap'
> &
	FlexShorthandProps<typeof flexProps> & {
		flex?: boolean | 1 | 0;
	};

export const alignmentProps = {
	justifyStart: { justifyContent: 'flex-start' },
	justifyCenter: { justifyContent: 'center' },
	justifyEnd: { justifyContent: 'flex-end' },
	justifyBetween: { justifyContent: 'space-between' },
	justifyAround: { justifyContent: 'space-around' },
	itemsStart: { alignItems: 'flex-start' },
	itemsCenter: { alignItems: 'center' },
	itemsEnd: { alignItems: 'flex-end' },
	itemsStretch: { alignItems: 'stretch' },
};

const flexProps = {
	flexNone: { flex: 'none' },
	flexAuto: { flex: 'auto' },
	flexRow: { flexDirection: 'row' },
	flexCol: { flexDirection: 'column' },
	flexWrap: { flexWrap: 'wrap' },
	flexNoWrap: { flexWrap: 'nowrap' },
	...alignmentProps,
};

export function Flex({ children, flex, ...props }: PrimitiveFlexProps) {
	const sprinklesProps = useMemo((): SprinkledProperties => {
		let primitiveProps: Record<string, any> = {
			...(flex === true && { flex: 'auto' }),
			...(flex === 1 && { flex: 1 }),
			...(flex === 0 && { flex: 0 }),
		};
		for (const prop in props) {
			if (prop in flexProps) {
				primitiveProps = {
					...primitiveProps,
					...flexProps[prop as keyof typeof flexProps],
				};
			} else {
				primitiveProps[prop] = props[prop as keyof typeof props];
			}
		}
		return primitiveProps;
	}, [flex, props]);

	return (
		<Primitive.div {...sprinklesProps} display="flex">
			{children}
		</Primitive.div>
	);
}
