<script lang="ts">
	// svelte stuff
	import { fade } from 'svelte/transition';
	import { draggable } from 'svelte-drag';

	import { connectToChild } from 'penpal';
	import IconButton from './components/WalletSelectorIcons.svelte';
	import Logo from './assets/Logo.svelte';

	export let wallet; // portal to the wallet
	export let inputUrl = 'http://localhost:8089/'; // pick better default
	let src = inputUrl;

	let placeholder = 'Enter Wallet Url';
	let child;
	let iframe;
	let focused;

	// flex dimensions
	let topOffsetHeight, topOffsetWidth;
	let iframeParentHeight;
	let iframeParentWidth;

	const data = {
		loading: true // load right away
	};

	async function handleIframeLoad() {
		data.loading = false;
		const connection = connectToChild({
			// The iframe to which a connection should be made.
			iframe,
			// Methods the parent is exposing to the child.
			methods: {
				setIframeParentHeight(height) {
					iframeParentHeight = height;
				},
				setIframeParentWidth(width) {
					console.log('Rx width', width);
					iframeParentWidth = width;
				}
			}
		});

		wallet = await connection.promise;
		return wallet;
	}

	const connect = () => {
		src = '';
		src = inputUrl;
		data.loading = true;
	};

	const disconnect = () => wallet.disconnect();
	const togglePopup = () => window.open(inputUrl);

	function handleKeydown(event) {
		if (event.key === 'Enter' && focused) connect();
	}

	$: iframe && iframe.addEventListener('load', handleIframeLoad);
	$: popupIcon = wallet?.keepPopup ? 'close' : 'launch';
	$: connectionIcon = wallet?.address ? 'unplug' : 'plug';
</script>

<svelte:window on:keydown={handleKeydown} />

<div
	class="url-input"
	use:draggable
	style="height: calc(var(--spacing) * 2 + {topOffsetHeight}px + {iframeParentHeight}px + 2px);
	--url-input-width: calc(var(--spacing) * 2 + {iframeParentWidth}px + 2px);
	--url-input-min-width: {topOffsetWidth}px;
	"
>
	<div
		class="top"
		bind:offsetHeight={topOffsetHeight}
		bind:offsetWidth={topOffsetWidth}
		style="--topOffsetHeight: {topOffsetHeight};"
	>
		<a href="https://PeerPiper.io" target="_blank" rel="noreferrer">
			<div class="actions logo">
				<Logo />
			</div></a
		>
		<div class="url-input-container">
			<input
				class="url"
				{placeholder}
				on:focus={() => (focused = true)}
				on:blur={() => (focused = false)}
				bind:value={inputUrl}
			/>
			<span class="green-line" />
		</div>
		<div class="actions">
			{#if wallet?.address || inputUrl}
				<div
					transition:fade={{ delay: 100, duration: 100 }}
					class={!wallet?.keepPopup ? 'action dim' : 'action'}
				>
					<IconButton icon={popupIcon} on:click={togglePopup} />
				</div>
			{/if}

			<div
				class={data?.loading
					? 'action dim'
					: 'action' && wallet?.address
					? ' connected '
					: ' disconnected '}
			>
				<IconButton
					icon={connectionIcon}
					on:click={() => {
						wallet?.address ? disconnect() : connect();
					}}
					><span class={wallet?.address ? ' connected ' : ' disconnected '}>
						{data.loading || !src ? 'Loading...' : 'Load'}
					</span></IconButton
				>
			</div>
		</div>
	</div>
	<div class="iframe" style="height: {iframeParentHeight}px">
		<iframe
			title="Web Wallet"
			bind:this={iframe}
			{src}
			style="width: 100%; height: 100%;"
			allow="clipboard-write 'self' {src}"
		/>
	</div>
</div>

<style>
	div {
		--background: #161616;
	}
	.top {
		display: flex;
		justify-content: space-between;
	}
	iframe {
		border: none;
	}
	.iframe {
		display: flex;
		height: 100%;
	}
	.logo {
		flex: 0 0 auto;
		position: relative;
		opacity: 1;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: calc(var(--spacing) / 2);
	}
	.url-input {
		position: fixed;
		top: var(--spacing);
		right: var(--spacing);
		background: var(--background);
		border: 0.5px solid #333;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		border-radius: 8px;
		--url-input-max-width: 80vw;
		max-width: var(--url-input-max-width);
		max-height: 95vh;
		width: min(var(--url-input-width), var(--url-input-max-width));
		min-width: var(--url-input-min-width);
		--spacing: 1em;
		padding: var(--spacing);
		filter: drop-shadow(2px 4px 6px rgba(133, 133, 133, 0.5));
	}
	.url-input:hover {
		cursor: move;
	}

	.url {
		padding: var(--spacing);
		padding-right: 0;
		flex: 1 1 0;
		min-width: 0;
		outline: none;
		background-color: var(--background);
	}

	.green-line {
		border-bottom: 4px solid #0eff02;
		margin-left: var(--spacing);
		flex: 1;
		position: relative;
		top: -8px;
	}

	.actions {
		display: flex;
	}

	.actions:last-child {
		padding-right: calc(var(--spacing) / 2);
	}

	.action.dim {
		opacity: 0.9;
		color: #e0f7fa;
	}

	.connected {
		color: greenyellow;
		text-shadow: 1px 1px 3px black;
	}

	.disconnected {
		color: #e0f7fa;
		text-shadow: 1px 1px 3px black;
	}

	.url-input-container {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	input {
		flex: 1 1 0;
		color: whitesmoke;
		background: none;
		border: none;
		margin: 0;
		padding: 0;
		font-size: 0.95em;
		min-width: 10ch;
		max-width: 25vw;
	}
</style>
