import { CSSProperties } from '@vanilla-extract/css';
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { motifStyle } from './motif-style.js';

export const styles = motifStyle(
	[
		'width',
		'height',
		'minHeight',
		'minWidth',
		'maxWidth',
		'maxHeight',
		'gridTemplateColumns',
		'gridTemplateRows',
		'gridTemplateAreas',
		'gridColumn',
		'gridRow',
		'gridArea',
		'top',
		'bottom',
		'left',
		'right',
		'zIndex',
		'fontSize',
	],
	{ shorthands: {} },
);

const structureProperties = defineProperties({
	properties: {
		display: ['none', 'flex', 'block', 'inline', 'grid'],
		flexDirection: ['row', 'column'],
		flex: ['auto', 'none', 1, 0],
		flexWrap: ['wrap', 'nowrap'],
		justifyContent: [
			'stretch',
			'flex-start',
			'center',
			'flex-end',
			'space-around',
			'space-between',
		],
		gap: ['inherit', 1, 0],
		alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
		justifyItems: ['start', 'center', 'end', 'stretch'],
		alignContent: [
			'normal',
			'flex-start',
			'center',
			'flex-end',
			'space-between',
			'space-around',
		],
		isolation: ['isolate', 'auto', 'initial'],
		overflow: ['auto', 'hidden', 'scroll'],
		overflowX: ['auto', 'hidden', 'scroll'],
		overflowY: ['auto', 'hidden', 'scroll'],
		position: ['absolute', 'sticky', 'relative', 'fixed'],
		visibility: {
			hidden: {
				border: '0',
				clip: 'rect(0 0 0 0)',
				height: '1px',
				margin: '-1px',
				overflow: 'hidden',
				padding: '0',
				position: 'absolute',
				whiteSpace: 'nowrap',
				width: '1px',
			},
		},
	},
});

export const boxStyle = motifStyle(
	['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
	{
		shorthands: {
			py: ['paddingTop', 'paddingBottom'],
			px: ['paddingLeft', 'paddingRight'],
			p: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
		},
	},
);

export const sprinkles = createSprinkles(structureProperties);

type StyleProperty = keyof typeof styles.refs;

export type PrimitiveStyle = {
	[K in StyleProperty]: K extends keyof typeof styles.refs
		? CSSProperties[K]
		: never;
};

export type SprinkledProperties = Parameters<typeof sprinkles>[0] &
	Partial<PrimitiveStyle>;
