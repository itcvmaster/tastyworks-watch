<script>
// @ts-nocheck
    import "./styles.css";
    import { browser } from "$app/environment";
    import { goto } from "$app/navigation";
    import AppGuard from "./AuthGuard.svelte";
    import { userStore } from "$lib/store";
    import { TabGroup } from "$lib/components";
    import { Actions } from "$lib/store/actions";

    // Creating a new watch list
    const handleCreateTab = (displayName) => {
        const watchId = `${Date.now()}`;
        userStore.dispatch({
            type: Actions.CREATE_WATCH,
            payload: { watchId, displayName },
        });

        selectedTab = watchId;
        goto (`/watch/${watchId}`);
    };

    // Selecting & Closing Tabs
    let selectedTab = "";
    const handleSelectTab = (watchId) => {
        goto(`/watch/${watchId}`);
        selectedTab = watchId;
    };

    const handleCloseTab = (watchId) => {
        userStore.dispatch({
            type: Actions.DELETE_WATCH,
            payload: { watchId },
        });
    };
    
</script>

<main>
    {#if browser}
        <AppGuard>
            <div class="container"  slot="opted">
                <h1>Trading Quotes</h1>
                <TabGroup
                    tabs={$userStore.watches}
                    selectedTab={selectedTab}
                    {handleCloseTab}
                    {handleCreateTab}
                    {handleSelectTab}
                >
                    <slot></slot>
                </TabGroup>
            </div>
            <div class="container" slot="not_opted">
                <slot></slot>
            </div>
        </AppGuard>
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