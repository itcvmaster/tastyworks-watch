<script>
	// @ts-nocheck
	import "./styles.css";
	import { browser } from "$app/environment";
	import AuthGuard from "./AuthGuard.svelte";
	import Login from "./LogIn.svelte";
	import Watchlist from "./Home.svelte";
</script>

<svelte:head>
	<title>Trade Watchlist</title>
	<meta name="Show Stock Price" content="Watchlist Test" />
</svelte:head>

<!-- Should moved to routing later -->
<main>
	{#if browser}
		<AuthGuard>
			<div class="container" slot="not_opted">
				<Login />
			</div>
			<div class="container" slot="opted">
				<Watchlist />
			</div>
		</AuthGuard>
	{:else}
		<h1>Loading Local Storage...</h1>
	{/if}
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-height: 100vh;
		flex: 1;
		padding: 1rem;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
