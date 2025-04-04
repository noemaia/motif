import type {
	ComponentPropsWithRef,
	ElementType,
	ReactElement,
	ReactNode,
} from 'react';

export type RenderProp<T> = ReactNode | ((props: T) => ReactElement);

export type ComposedPrimitive<T, Element extends ElementType = 'div'> = Omit<
	ComponentPropsWithRef<Element>,
	'children'
> & {
	children?: RenderProp<T>;
};

export function composeRender<T, U, V extends T>(
	value: T extends any ? T | ((renderProps: U) => V) : never,
	wrap?: (prevValue: T, renderProps: U) => V,
): (renderProps: U) => V {
	return (renderProps) => {
		const renderValue =
			typeof value === 'function' ? value(renderProps) : value;
		return wrap ? wrap(renderValue, renderProps) : renderValue;
	};
}
