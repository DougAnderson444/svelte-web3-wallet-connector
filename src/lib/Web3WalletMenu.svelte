<script>
	import '../app.css';

	import { onMount } from 'svelte';
	import MenuWrapper from './MenuWrapper.svelte';
	import ConnectorInside from './ConnectorInside.svelte';

	export let inputUrl;
	export let wallet;

	let mounted;

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<!-- <Connector bind:wallet {inputUrl} /> -->
	<MenuWrapper let:openNav>
		<ConnectorInside bind:wallet {inputUrl} show={openNav} />
	</MenuWrapper>
{/if}
