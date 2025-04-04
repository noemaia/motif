import { MotifComponents, createMotif } from './create-motif.js';
import { sprinkles, styles } from './primitives.css.js';

const NODES = [
	'button',
	'div',
	'h1',
	'h2',
	'h3',
	'span',
	'table',
	'thead',
	'tbody',
	'th',
	'tr',
	'td',
] as const;

export const Primitive = createMotif(NODES, sprinkles, styles);
export type PrimitiveProps = MotifComponents<typeof Primitive>;

export const { button: Button, div: Box } = Primitive;
