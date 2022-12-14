<script>
	import "./styles.css";
    import { browser } from "$app/environment";
</script>

<main>
	{#if browser}
		<slot />
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
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
