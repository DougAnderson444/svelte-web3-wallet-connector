import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import svg from 'rollup-plugin-svg';
import json from '@rollup/plugin-json';
import inlineSvg from 'rollup-plugin-inline-svg';
import { globbySync } from 'globby';

const production = !process.env.ROLLUP_WATCH;
const formats = ['iife', 'umd', 'es']; // ['iife', 'umd', 'es']
const components = globbySync([
	'src/lib/*.svelte' // include all svelte components
]).map((path) => ({
	// get the folder preceding the file name
	namespace: path.split('/')[path.split('/').length - 2],
	component: path.split('/')[path.split('/').length - 1]
}));

export default components.map(({ namespace, component }) => ({
	input: `src/lib/${component}`,
	output: formats.map((format) => ({
		name: component,
		file: `src/lib/bundled/${format}/${component}.js`, // gets added to deployments & package manager this way
		// dir: `build/components/`,
		format,
		inlineDynamicImports: true
		// sourcemap: true
	})),
	plugins: [
		json(),
		inlineSvg({}),
		typescript({
			sourceMap: !production
		}),
		svg(),
		svelte({
			compilerOptions: {
				dev: !production
				// customElement: true
			},
			preprocess: sveltePreprocess({
				sourceMap: !production
			}),
			emitCss: false // inline
		}),
		css({ output: 'bundle.css' }), // not needed if emitCss: false
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs()
		// terser()
	],
	watch: {
		clearScreen: false
	}
}));
