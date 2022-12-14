<script>
    // @ts-nocheck
    import "./styles.css";
    import { onDestroy } from "svelte";
    import { browser } from "$app/environment";
    import { userStore } from "../lib/store";
    import Login from "./login/+page.svelte";
    import Watchlist from "./trade-watch/+page.svelte";

    let user = {};
    let unsubscribe = userStore.subscribe((u) => (user = u));

    onDestroy(unsubscribe);
</script>

<svelte:head>
    <title>Home</title>
    <meta name="Show Stock Price" content="Watchlist Test" />
</svelte:head>

<main>
    {#if browser}
        {#if user && user.watches}
            <Watchlist />
        {:else}
            <Login />
        {/if}
    {:else}
        <h1>Loading Local Storage...</h1>
    {/if}
</main>

<style>
    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
        padding: 1rem;
        width: 100%;
        max-width: 64rem;
        margin: 0 auto;
        box-sizing: border-box;
    }
</style>
