<script>
// @ts-nocheck

    export let itemLabel;
    export let highlighted;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<li class="autocomplete-items" class:autocomplete-active={highlighted} on:click>
    {@html itemLabel}
</li>

<style>
    li.autocomplete-items {
        list-style: none;
        border-bottom: 1px solid #d4d4d4;
        z-index: 99;
        top: 100%;
        left: 0;
        right: 0;
        padding: 10px;
        cursor: pointer;
        background-color: #fff;
    }

    li.autocomplete-items:hover {
        background-color: #81921f;
        color: white;
    }

    li.autocomplete-items:active {
        background-color: DodgerBlue !important;
        color: #ffffff;
    }

    .autocomplete-active {
        background-color: DodgerBlue !important;
        color: #ffffff;
    }
</style>
