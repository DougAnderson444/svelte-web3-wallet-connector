<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';

	let wallet; // the variable you interact with the wallet functions
	let Web3WalletMenu; // the Component variable
	let RSAPublicKey: { kty: string; n: string; e: string; kid?: string } | null;
	let Ed25519PublicKey: Uint8Array | null;
	let ownerAddress: string | null;

	const dispatch = createEventDispatcher();

	onMount(async () => {
		Web3WalletMenu = await import('./Web3WalletMenu.svelte');
	});

	async function walletReady(e) {
		wallet = e.detail.wallet;
		console.log('walletReady', wallet);
		ownerAddress = await wallet?.arweaveWalletAPI?.getActiveAddress();
		RSAPublicKey = await wallet.arweaveWalletAPI.getActivePublicKey();
		Ed25519PublicKey = await wallet.proxcryptor.getPublicKey();
		dispatch('RSAPublicKey', RSAPublicKey);
		dispatch('Ed25519PublicKey', Ed25519PublicKey);
		dispatch('ownerAddress', ownerAddress);
	}
</script>

<!-- Anywhere in your app, it will be fixed in the upper right hand corner of the page -->
{#if Web3WalletMenu}
	<svelte:component this={Web3WalletMenu} on:walletReady={walletReady} />
	{#if wallet && RSAPublicKey && Ed25519PublicKey}
		<slot {wallet} {ownerAddress} {RSAPublicKey} {Ed25519PublicKey} />
	{/if}
{/if}
