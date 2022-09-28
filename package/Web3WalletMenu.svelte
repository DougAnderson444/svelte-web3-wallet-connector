<script>
	import { onMount } from 'svelte';
	import MenuWrapper from './MenuWrapper.svelte';
	import ConnectorInside from './ConnectorInside.svelte';

	export let inputUrl;
	export let wallet = null;

	let mounted;

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<MenuWrapper let:openNav let:hideNav>
		<ConnectorInside bind:wallet {inputUrl} show={openNav} hide={hideNav} on:walletReady />
	</MenuWrapper>
{/if}
