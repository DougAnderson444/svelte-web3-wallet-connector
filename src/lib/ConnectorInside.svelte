<script lang="ts">
	// svelte stuff
	import { fade } from 'svelte/transition';

	import { connectToChild } from 'penpal';
	import IconButton from './components/WalletSelectorIcons.svelte';
	import Logo from './assets/Logo.svelte';

	export let wallet; // portal to the wallet
	export let inputUrl = 'http://localhost:8089/'; // pick better default
	let src = inputUrl;

	let placeholder = 'Enter Wallet Url';
	let iframe;
	let focused;

	// flex dimensions
	export let topOffsetHeight = 0;
	export let topOffsetWidth = 0;
	export let iframeParentHeight = 0;
	export let iframeParentWidth = 0;

	export let show;

	const data = {
		loading: true // load right away
	};

	async function handleIframeLoad() {
		data.loading = false;

		let pending;

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
				},
				show() {
					show();
				},
				walletReady() {
					wallet = pending;
				}
			}
		});

		pending = await connection.promise;
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

<div class="connector-container">
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
	<div class="iframe" style="height: calc({iframeParentHeight}px + 18px)">
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
		--spacing: 1em;
	}
	.connector-container {
		padding: 1.618em;
	}
	div {
		--background: #161616;
	}
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
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
