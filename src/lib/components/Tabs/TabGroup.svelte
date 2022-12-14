<script>
    import { createEventDispatcher } from "svelte";
    import ClosingTab from "./ClosingTab.svelte";

    export let tabs = {};
    let selectedTab = Object.keys(tabs).length > 0 ? Object.keys(tabs)[0] : "";
    let autoInc = 1;

    const dispatch = createEventDispatcher();
    const onSelectTab = (event) => {
        selectedTab = event.detail;
        dispatch("selectTab", selectedTab);
    };
    const onCreateTab = () => {
        dispatch("createTab", "Watch" + autoInc++);
    };
</script>

<div class="box">
    <ul>
        {#each Object.keys(tabs) as tab}
            <li>
                <ClosingTab
                    tabName={tab}
                    isActive={tab === selectedTab}
                    on:closeTab
                    on:selectTab={onSelectTab}
                />
            </li>
        {/each}
        <li>
            <button class="btn-create" on:click={onCreateTab}> + </button>
        </li>
    </ul>
    <div class="tab-content">
        <slot {selectedTab}>
            <em>No watch list has been added.</em>
        </slot>
    </div>
</div>

<style>
    .box {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
    }

    ul {
        display: flex;
        flex-wrap: wrap;
        list-style: none;
        border-bottom: 1px solid gray;
        margin: 0;
        padding: 0;
    }

    .tab-content {
        padding: 30px;
        border: 1px solid gray;
        border-radius: 0 0 6px 6px;
        border-top: 0;
        box-sizing: border-box;
    }

    .btn-create {
        display: block;
        background-color: transparent;
        border: 1px solid transparent;
        border-bottom: 0;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        padding: 8px 32px;
        cursor: pointer;
    }
    .btn-create:hover {
        border: 1px solid gray;
        border-bottom: 0;
    }
</style>
