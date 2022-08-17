# Web3 Wallet Connector

Embed this Connector on your website to enable your visitors to use Web3 on your site!

Your visitors get to choose their wallet, so the integration is simple for you.

## Vanilla JS Bindings

You can use the Wallet as an ES Module, IIFE, or UMD module.

For example, in your client side (browser) code, you can import an ES module and mount it to the DOM using `new`. Pass it the URL where to load the Wallet, then set your wallet object to be the event detail returned when the wallet is ready.

```js

import Web3WalletMenu from '@peerpiper/web3-wallet-connector/bundled/es/Connector.svelte.js

let wallet

const connector = new Web3WalletMenu({
	target: document.body,
	props: {
		inputUrl: 'https://peerpiper.github.io/iframe-wallet-sdk/'; // default
});

connector.$on("walletReady", async(event) => {
	wallet = event.detail

	// now you can use wallet
	const signature = await wallet.ed25519.sign(someData)
})

```

## Svelte Bindings

Import the Svelte component into your project:

```js
import { Web3WalletConnector } from "@peerpiper/svelte-web3-wallet-connector"

let wallet
let inputUrl = 'https://peerpiper.github.io/iframe-wallet-sdk/'; // the default URL, can be anywhere

<Web3WalletConnector bind:wallet {inputUrl} />

// use any method available from their Wallet provider
wallet.ed25519.sign(someData)
wallet.proxcryptor.selfEncrypt(someSecret)
wallet.arweaveWalletAPI.signTransaction(txData)

```

### Deatiled Svelte Usage

Use the PeerPiper wallet on your website to connect directly with your users. Allows them to "sign in" with their keypair, subscribe to each others' data feeds.

The wallet Frontend is written in Svelte and easy to use:

Step 1: Install the waller connector:

```bash
npm i github:@peerpiper/web3-wallet-connector
```

Step 2: Load the Wallet component

```svelte
<script lang="ts">
	import { onMount } from 'svelte';

	let wallet; // the variable you interact with the wallet functions
	let Web3WalletMenu; // the Component variable
	let inputUrl = 'https://peerpiper.github.io/iframe-wallet-sdk/'; // the default URL, can be your own or the user's own URL

	onMount(async () => {
		({ Web3WalletMenu } = await import('@peerpiper/web3-wallet-connector'));
	});
</script>

// in your Svelte app
<div class="">
	<!-- Anywhere in your app, it will be fixed in the upper right hand corner of the page -->
	{#if Web3WalletMenu}
		<svelte:component this={Web3WalletMenu} bind:wallet {inputUrl} />
	{:else}
		Loading Web3 Wallet...<br />
	{/if}
</div>
```
