<script>
	import { draggable } from 'svelte-drag';
	import Logo from './assets/Logo.svelte'; // https://peerpiper.io

	let navOpen = false;

	function handleNav() {
		navOpen = !navOpen;
	}

	function onClickOutside(event) {
		navOpen = false;
	}
</script>

<!-- Use Menu Icon to open the sidenav -->
<div class="container" class:change={navOpen} on:click={handleNav} use:draggable>
	<Logo />
	<div class="menu-icon">
		<div class="bar1" />
		<div class="bar2" />
		<div class="bar3" />
	</div>
</div>

<div class:mask={navOpen} on:click={onClickOutside} />
<div class="sidenav" class:open={navOpen}>
	<slot openNav={() => (navOpen = true)} hideNav={() => (navOpen = false)} />
</div>

<style>
	.container {
		display: flex;
		align-items: center;
		position: absolute;
		top: 0%;
		right: 0%;
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
		z-index: 10;
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
