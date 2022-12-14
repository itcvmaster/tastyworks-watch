<script>
    // @ts-nocheck
    import { onDestroy } from "svelte";
    import { userStore } from "../lib/store";
    import AuthGuard from "./AuthGuard.svelte";
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

<AuthGuard>
    <Login slot="not_opted"/>
    <Watchlist slot="opted" />
</AuthGuard>
