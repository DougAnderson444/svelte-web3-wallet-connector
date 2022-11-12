<script>
	import { onMount } from 'svelte';
	import { draggable } from '@neodrag/svelte';
	import Logo from './assets/Logo.svelte'; // https://peerpiper.io

	export let inputUrl;

	let ready;
	let navOpen;
	let saveInputURL;
	const INPUT_URL = 'INPUT_URL';

	// cache user's preferred wallet URL to their browser
	onMount(async () => {
		// check if indexeddb is available in this context
		if (typeof window.indexedDB === 'undefined') {
			console.log('IndexedDB not available');
			return;
		}

		const { ImmortalDB } = await import('immortal-db');

		saveInputURL = async (e) => {
			const src = e.detail;
			try {
				await ImmortalDB.set(INPUT_URL, src);
			} catch (error) {
				console.warn('Did not save', src, error);
			}
		};

		// check for URL
		try {
			const storedValue = await ImmortalDB.get(INPUT_URL, null);
			if (storedValue && !inputUrl) {
				inputUrl = storedValue;
			}
		} catch (error) {
			console.warn('Did not get', error);
		}
		ready = true;
	});

	function handleNav() {
		navOpen = !navOpen;
	}

	function onClickOutside(event) {
		navOpen = false;
	}
	function hideNav() {
		navOpen = false;
	}
	const openNav = () => (navOpen = true);
</script>

<!-- Use Menu Icon to open the sidenav -->
<div
	class="container"
	class:change={navOpen}
	on:keypress={handleNav}
	on:click={handleNav}
	use:draggable
>
	<Logo />
	<div class="menu-icon">
		<div class="bar1" />
		<div class="bar2" />
		<div class="bar3" />
	</div>
</div>

<div class:mask={navOpen} on:keypress={onClickOutside} on:click={onClickOutside} />
{#if ready}
	<div class="sidenav" class:open={navOpen}>
		<slot {openNav} {hideNav} {saveInputURL} {inputUrl} />
	</div>
{/if}

<style>
	.container {
		display: flex;
		align-items: center;
		position: absolute;
		top: 6px;
		right: 5px;
		z-index: 100;
		cursor: pointer;
		/* 	background-color: black; */
		margin: 1.618em;
		opacity: 0.95;
		width: auto;
	}

	.menu-icon {
		display: inline-block;
	}
	.bar1,
	.bar2,
	.bar3 {
		width: 35px;
		height: 5px;
		background-color: #0bb113;
		margin: 6px 0;
		transition: 0.4s;
	}

	.change .bar1 {
		-webkit-transform: rotate(-45deg) translate(-9px, 6px);
		transform: rotate(-45deg) translate(-9px, 6px);
	}

	.change .bar2 {
		opacity: 0;
	}

	.change .bar3 {
		-webkit-transform: rotate(45deg) translate(-8px, -8px);
		transform: rotate(45deg) translate(-8px, -8px);
	}

	/* The side navigation menu */
	.sidenav {
		position: fixed;
		top: 0;
		right: 0;
		height: 15%;
		width: 0; /* 0 width - change this with JavaScript */
		z-index: 50;
		background-color: #111;
		overflow-x: inherit; /* Disable horizontal scroll */
		padding-top: 30px;
		transition: 0.25s;
	}

	.open {
		width: 80%;
		height: 100%;
		overflow-x: scroll;
	}

	.mask {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		opacity: 0.5;
		background-color: #444;
		transition: 0.4s;
	}

	/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
	@media screen and (max-height: 450px) {
		.sidenav {
			padding-top: 15px;
		}
	}
</style>
