# Web3 Wallet Connector

Embed this Connector on your website to enable your visitors to use Web3 on your site!

Your visitors get to choose their wallet, so the integration is simple for you.

## Svelte Bindings

Import the Svelte component into your project:

```js
import { Web3WalletConnector } from "@peerpiper/svelte-web3-wallet-connector"

let wallet
let inputUrl = 'https://wallet.peerpiper.io/' // can be changed by any user

<Web3WalletConnector bind:wallet {inputUrl} />

// use any method available from their Wallet provider
wallet.ed25519.sign(someData)
wallet.proxcryptor.selfEncrypt(someSecret)
wallet.arweave.signTransaction(txData)

```

### Deatiled Svelte Usage

Use the PeerPiper wallet on your website to connect directly with your users. Allows them to "sign in" with their keypair, subscribe to each others' data feeds.

The wallet Frontend is written in Svelte and easy to use:

Step 1: Install the waller connector:

```bash
npm i github:@peerpiper/web3-wallet-connector
```

Step 2: Load the Wallet component

```js
// in your Svelte app
<script lang="ts">
	import { onMount } from 'svelte';

    let wallet; // the variable you interact with the wallet functions
    let Web3WalletMenu; // the Component variable
    let inputUrl = 'https://peerpiper.github.io/iframe-wallet-engine'; // the default URL, can be your own or the user's own URL

	onMount(async () => {
        ({ Web3WalletMenu } = await import('@peerpiper/web3-wallet-connector'));
    })

</script>

<div class="">
	<!-- Anywhere in your app, it will be fixed in the upper right hand corner of the page -->
	{#if Web3WalletMenu}
		<svelte:component this={Web3WalletMenu} bind:wallet {inputUrl} />
	{:else}
		Loading Web3 Wallet...<br />
	{/if}
</div>
```

Step 3: Interact with the Wallet

```js

```

---

## React Bindings

TODO

---

## Vanilla JS Bindings

TODO

---
