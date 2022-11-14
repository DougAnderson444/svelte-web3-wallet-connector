/**
 * Build the config object to deploy this build ArDag
 * anything with a "path" field will be read by ArDag and placed as the value of the field
 */
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import fs from 'fs';

// nodejs fs readFileSync package.json from disj then parse into json object
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

dotenv.config(); //load from .env

export const config = {
	jwk: {
		path: process.env.JWK_FILE_PATH // arweave jwk file path to use to save to ArDag
	},
	overwrite: false, // add onto the previous data
	tag: 'PeerPiper-Web3-Wallet-Connector',
	// The object to be pushed to the dag:
	obj: {
		compiled: {
			path: './src/lib/bundled/es/Web3WalletMenu.svelte.js'
		},
		components: {
			// Optionally also upload the source files uncompiled
		},
		meta: {
			package: packageJson.name,
			version: packageJson.version,
			url: packageJson.homepage,
			title: 'Web3WalletMenu',
			author: 'douganderson444.ar',
			visible: true, // whether to list this in the owner's menu of DApps
			networkRequired: true // whether this app needs the network to function or can be sandboxed without network
		},
		thumbnail: {
			path: 'static/thumbnail.png'
		},
		data: {
			// this is my preferences when using the app, it's "My data"
			url: 'https://peerpiper.github.io/iframe-wallet-sdk/'
		}
	}
};
