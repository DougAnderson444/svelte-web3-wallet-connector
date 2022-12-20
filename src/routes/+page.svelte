<script>
	import '$lib/app.css';

	import { onMount } from 'svelte';
	import { Web3WalletMenu } from '../../package/index';

	import { dev } from '$app/environment';

	let wallet;
	let mounted;
	let signature;

	let show;
	onMount(() => {
		mounted = true;
	});

	// run as soon as the wallet is ready
	$: if (wallet)
		wallet.ed25519.sign({ someData: 'some data' }).then((sig) => {
			console.log('Signature from Wallet:', sig);
			signature = sig;
		});
</script>

<div class="app" id="app">
	<h1>Welcome to Web3 Wallet Connector</h1>
	<div>
		To get started,
		<ul>
			<li>
				create a wallet variable which will give you access to the RPC wallet calls (such as sign,
				encrypt, etc.)
			</li>
			<li>pass in a starting url for the RPC wallet in the iframe</li>
		</ul>
	</div>
	{#if mounted}
		<Web3WalletMenu
			on:walletReady={(e) => {
				wallet = e.detail.wallet;
			}}
		/>
	{/if}
	Signature:
	<div class="max-w-screen break-all">
		{signature}
	</div>
</div>

<style>
</style>
