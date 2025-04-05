# @noema/motif

A type-safe styling library for React components built on top of [Vanilla Extract](https://vanilla-extract.style/). `@noema/motif` allows you to create styled components with consistent theme-aware props that cleanly separate styling from component logic.

## Installation

`@vanilla-extract/css` and `@vanilla-extract/sprinkles` will also need to get installed.

```bash
npm install @noema/motif @vanilla-extract/css @vanilla-extract/sprinkles
```

## Basic Usage

### 1. Define your styles (in a `.css.ts` file)

```typescript
// styles.css.ts
import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles';
import { motifStyle } from '@noema/motif';

// Define your style properties
export const styles = motifStyle(
	[
		'width',
		'height',
		'fontSize',
		// Add more CSS properties as needed
	],
	{
		shorthands: {
			// Define shorthands if needed
			size: ['width', 'height'],
		},
	},
);

// Define your sprinkles (theme-based properties)
const colorProperties = defineProperties({
	properties: {
		color: {
			primary: 'blue',
			secondary: 'purple',
			// Add more theme colors
		},
		backgroundColor: {
			primary: 'white',
			secondary: 'lightgray',
			// Add more theme colors
		},
	},
});

export const sprinkles = createSprinkles(colorProperties);
```

### 2. Create your components

```typescript
// components.tsx
import { createMotif, motif } from '@noema/motif';
import { sprinkles, styles } from './styles.css';

// Creae a single component
const BoxComp = motif('div', sprinkles, styles);

// Or multiple components
const elements = ['div', 'button', 'span', 'h1'] as const;

// Create your styled components
export const Styled = createMotif(elements, sprinkles, styles);

// Export individual components for convenience
export const { div: Box, button: Button } = Styled;
```

### 3. Use your components

```tsx
import { Box, Button } from './components';

function MyComponent() {
	return (
		<Box width={200} height={100} color="primary">
			<Button fontSize={16} backgroundColor="secondary">
				Click me
			</Button>
		</Box>
	);
}
```

## API Reference

### `motifStyle(properties, options)`

Creates a style configuration for use with `motif` or `createMotif`.

**Parameters:**

- `properties`: Array of CSS property names to be controlled via props
- `options`: Configuration options
  - `prefix`: Prefix for CSS variable names (default: 'motif')
  - `base`: Base styles to apply to all components
  - `shorthands`: Record of shorthand property names mapping to CSS properties

**Returns:** Style configuration object

### `createMotif(elements, sprinkles, config)`

Creates a collection of styled components.

**Parameters:**

- `elements`: Array of HTML element types to create components for
- `sprinkles`: Vanilla Extract sprinkles function
- `config`: Style configuration created with `motifStyle`

**Returns:** Object with styled components for each element

### `motif(element, sprinkles, config)`

Core function that creates a single styled component.

**Parameters:**

- `element`: HTML element type
- `sprinkles`: Vanilla Extract sprinkles function
- `config`: Style configuration created with `motifStyle`

**Returns:** Styled React component

## How It Works

Motif combines two styling approaches to create a powerful and flexible styling system:

### Core Concepts

1. **`motifStyle`** - Defines which CSS properties can be used as component props

   - Creates CSS variables for each property
   - Generates CSS classes that apply these variables
   - Allows defining shorthand props (like `p` for all paddings)

2. **Runtime Styling Flow**

   - When you pass props to a motif component (e.g., `width={200}`):
     - The value is converted to a CSS variable value
     - The corresponding CSS class is applied to the component
     - The CSS variable is set as an inline style

This hybrid approach enables:

- Type safety through TypeScript
- Performance of atomic CSS
- Flexibility of runtime values via CSS variables
- Theme consistency via Vanilla Extract's design system

## Example

```typescript
// primitives.css.ts
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

// Structural properties for layout
const structureProperties = defineProperties({
	properties: {
		display: ['none', 'flex', 'block', 'inline', 'grid'],
		flexDirection: ['row', 'column'],
		// ... more properties
	},
});

// Box style with padding shorthands
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
```

```typescript
// primitives.tsx
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

// Create primitive components
export const Primitive = createMotif(NODES, sprinkles, styles);
export type PrimitiveProps = MotifComponents<typeof Primitive>;

// Export common components
export const { button: Button, div: Box } = Primitive;
```

## Additional Utilities

The library also includes additional utilities:

- `createContext` - A utility for creating React context with improved type safety and error messages
- `composeRender` - A utility for composing render props with improved type safety

## License

MIT
