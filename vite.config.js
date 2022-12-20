import { sveltekit } from '@sveltejs/kit/vite';
import path, { dirname } from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@peerpiper/web3-wallet-connector': path.resolve('src/lib')
		}
	},
	build: {
		sourcemap: true
	},
	optimizeDeps: {
		// include: [],
		// force: true
	},
	server: {
		fs: {
			strict: false
		}
	}
};

export default config;
