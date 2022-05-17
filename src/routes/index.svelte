<script>
	import '$lib/app.css';

	import { onMount } from 'svelte';
	import Web3WalletMenu from '$lib/Web3WalletMenu.svelte';

	import { dev } from '$app/env';

	export let inputUrl;

	let wallet;
	let mounted;

	let show;
	onMount(() => {
		mounted = true;
	});
</script>

<div class="app" id="app">
	<h1>Welcome to SvelteKit - Web3 Wallet Connector</h1>
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
		<Web3WalletMenu bind:wallet {inputUrl} />
	{/if}
</div>

<style>
	/* .app {
		--app-spacing: 48px;
		--spacing: 2em;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: var(--app-spacing);
		padding-bottom: 0;
	}

	@media (max-width: 599px) {
		.app {
			--app-spacing: 24px;
			--spacing: 1.5em;
		}
	}

	@media (max-width: 399px) {
		.app {
			--app-spacing: 12px;
		}
	} */
</style>
