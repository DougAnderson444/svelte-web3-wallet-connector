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
wallet.proxcryptor.selfEncrypt(someSecret
wallet.arweave.signTransaction(txData)

```

## React Bindings

## Vanilla JS Bindings
