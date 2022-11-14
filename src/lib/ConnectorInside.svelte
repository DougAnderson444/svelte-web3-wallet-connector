<script lang="ts">
	// svelte stuff
	import { onMount, createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	import { connectToChild } from 'penpal';
	import IconButton from './components/WalletSelectorIcons.svelte';
	import Logo from './assets/Logo.svelte';

	export let wallet = null;
	export let inputUrl = 'https://peerpiper.github.io/iframe-wallet-sdk/';

	// flex dimensions
	export let topOffsetHeight = 0;
	export let topOffsetWidth = 0;
	export let iframeParentHeight = 0;
	export let iframeParentWidth = 0;
	let iframeOffsetWidth;

	export let show;
	export let hide;

	const dispatch = createEventDispatcher();

	let src;

	let placeholder = 'Enter Wallet Url';
	let iframe;
	let focused;

	const data = {
		loading: true // load right away
	};

	// cache user's preferred wallet URL to their browser
	onMount(async () => {
		connect();
	});

	async function handleIframeLoad() {
		// console.log('Iframe loaded');
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
					// console.log('Rx width', width);
					iframeParentWidth = width;
				},
				show() {
					show();
				},
				hide() {
					console.log('hiding', { hide });
					hide();
				},
				// walletReady gets called from wallet-sdk when
				// connectionsReady is called which is called when
				// loadedKeys is fired
				// which only happens when the keys are loaded
				walletReady() {
					wallet = pending; // when using svelte bind:wallet
					dispatch('walletReady', { wallet }); // when using vanilla JS
					// overwrite any other arweave wallets on the window object
					// @ts-ignore
					window.arweaveWallet = wallet.arweaveWalletAPI;
					if (wallet) {
						// hack: await 250 milliseconds
						setTimeout(() => {
							hide();
						}, 250);
					}
					return true;
				}
			}
		});

		pending = await connection.promise;
		show();
	}

	const connect = () => {
		if (src === inputUrl) return;
		src = '';
		src = inputUrl;
		data.loading = true;
		dispatch('inputUrl', inputUrl); // when using vanilla JS
	};

	const disconnect = () => wallet.disconnect();
	const togglePopup = () => window.open(inputUrl);

	function handleKeydown(event) {
		if (event.key === 'Enter' && focused) connect();
	}

	$: iframe && iframe.addEventListener('load', handleIframeLoad);
	$: popupIcon = wallet?.keepPopup ? 'close' : 'launch';
	$: connectionIcon = wallet?.address ? 'unplug' : 'plug';
	$: iframeOffsetWidth && wallet && wallet?.setWidth(iframeOffsetWidth);
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="flex flex-col m-2 max-w-full h-screen">
	<div
		class="flex flex-row space-between items-center"
		bind:offsetHeight={topOffsetHeight}
		bind:offsetWidth={topOffsetWidth}
		style="--topOffsetHeight: {topOffsetHeight};"
	>
		<a class="flex-0 hidden sm:flex" href="https://PeerPiper.io" target="_blank" rel="noreferrer">
			<div class="actions logo">
				<Logo />
			</div></a
		>
		<div class="flex-shrink flex flex-col w-full pl-2">
			<input
				class="url pl-0 p-[1em] pr-0 text-white bg-none border-none m-0 text-sm sm:text-base outline-none"
				{placeholder}
				on:focus={() => (focused = true)}
				on:blur={() => (focused = false)}
				bind:value={inputUrl}
			/>
			<span class="border-b-4 border-[#0eff02] flex-1 relative -top-2" />
		</div>
		<div class="flex">
			<div
				class={data?.loading
					? 'action dim'
					: 'action' && wallet?.address
					? ' connected '
					: ' disconnected '}
			>
				<IconButton
					icon={connectionIcon}
					on:keypress={() => {
						wallet?.address ? disconnect() : connect();
					}}
					on:click={() => {
						wallet?.address ? disconnect() : connect();
					}}
					><span class="{wallet?.address ? ' connected ' : ' disconnected '} hidden sm:flex">
						{data.loading || !src ? 'Loading...' : 'Load'}
					</span></IconButton
				>
			</div>
		</div>
	</div>
	<div
		class="iframe"
		style="height: calc({iframeParentHeight}px + 18px)"
		bind:offsetWidth={iframeOffsetWidth}
	>
		<iframe
			title="Web Wallet"
			bind:this={iframe}
			{src}
			allow="clipboard-read 'self' 'src'; clipboard-write 'self' 'src';"
		/>
		<!-- allow="clipboard-read 'self' 'src' {src}; clipboard-write 'self' 'src' {src};" -->
	</div>
</div>

<style lang="postcss">
	div {
		--spacing: 1em;
	}
	div {
		--background: #161616;
	}
	iframe {
		border: none;
		width: 100%;
		height: 100%;
	}
	.iframe {
		display: flex;
		height: 100%;
		min-height: 500px;
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
		flex: 1 1 0;
		background-color: var(--background);
	}

	.green-line {
		border-bottom: 4px solid #0eff02;
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
</style>
