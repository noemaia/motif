import { vanillaExtractPlugin } from '@vanilla-extract/rollup-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, type PluginOption } from 'vite';
import dts from 'vite-plugin-dts';
import { externalizeDeps } from 'vite-plugin-externalize-deps';

const isProd = process.env.NODE_ENV === 'production';

const plugins: PluginOption[] = [
	externalizeDeps(),
	react(),
	dts({
		tsconfigPath: './tsconfig.build.json',
		compilerOptions: { declarationMap: !isProd },
	}),
];

// if (!isProd) {
// 	plugins.push(viteVanillaExtractPlugin({ identifiers: 'debug' }));
// }

export default defineConfig({
	plugins,

	build: {
		cssCodeSplit: true,
		lib: {
			entry: [resolve(__dirname, 'src/index.ts')],
			formats: ['es'],
			fileName(_format, entryName) {
				return `${entryName}.js`;
			},
		},
		minify: false,
		sourcemap: true,
		rollupOptions: {
			output: {
				preserveModules: true,
				preserveModulesRoot: 'src',
				exports: 'auto',

				assetFileNames({ name }) {
					return name?.replace(/^src\//, '') ?? '';
				},
			},
			plugins: [vanillaExtractPlugin()],
		},
	},
});
