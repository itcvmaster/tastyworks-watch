<script>
// @ts-nocheck

    import { createEventDispatcher } from "svelte";

    export let tab = {};
    export let isActive = false;
    const dispatch = createEventDispatcher();
    const onSelectTab = () => dispatch("selectTab", tab.id);
    const onCloseTab = () => dispatch("closeTab", tab.id);
</script>

<button
    class={isActive ? "tab-item active" : "tab-item"}
    on:click={onSelectTab}
>
    <span>{tab.displayName}</span>
    <button id="btn-close" on:click={onCloseTab}>X</button>
</button>

<style>
    .tab-item {
        position: relative;
        background-color: transparent;
        border: 1px solid transparent;
        border-bottom: 0;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
        display: block;
        padding: 8px 32px;
    }

    .tab-item:hover {
        border-color: gray;
    }

    .tab-item.active {
        border-color: gray;
        background-color: rgba(255,255,255, 0.7);
    }

    #btn-close {
        position: absolute;
        top: 3px;
        right: 3px;
        border: 1px solid transparent;
        font-size: 10px;
        visibility: hidden;
        background-color: transparent;
    }

    .tab-item:hover #btn-close {
        visibility: visible;
    }

    .tab-item:hover #btn-close:hover {
        color: brown;
        font-weight: 800;
        visibility: visible;
    }
</style>
