<script>
	import { onMount } from 'svelte'; // Svelte way of ensuring we are in the browser, not server side

	// example of how to do it with Vanilla JavaScript
	import Web3WalletMenu from '@peerpiper/web3-wallet-connector/bundled/es/Web3WalletMenu.svelte.js';

	let wallet;
	let signature;

	// Whatever framework you use, make sure that the DOM has mounted before you call this function
	const main = async () => {
		const connector = new Web3WalletMenu({
			target: document.body,
			props: {
				inputUrl: 'https://peerpiper.github.io/iframe-wallet-sdk/' // default
			}
		});

		connector.$on('walletReady', async (event) => {
			console.log('walletReady event', event.detail.wallet);
			wallet = event.detail.wallet;

			// now you can use wallet
			signature = await wallet.ed25519.sign({ someData: 'some data' });
		});
	};

	// for Svelte, onMount ensures the DOM has mounted first
	onMount(main);
</script>

Signature from Wallet: {signature}
