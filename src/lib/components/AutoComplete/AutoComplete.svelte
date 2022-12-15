<script>
    // @ts-nocheck
    import { createEventDispatcher } from "svelte";
    import * as Api from "$lib/api";
    import { makeMatchBold, removeBold, debounce } from "$lib/utils";
    import Item from "./Item.svelte";

    let symbols = [];
    const fetchSymbols = async () => {
        const result = await Api.fetchSymbols(searchKey);
        if (result) {
            symbols = result.data.items.map(item => makeMatchBold(item.symbol, searchKey));
        }
    };

    let searchInput; // Used with bind:this to focus element
    let searchKey = "";
    $: if (!searchKey) {
        symbols = [];
        highlightIndex = null;
    }

    // Event Handlers
    const selectSymbol = (symbol) => {
        searchKey = removeBold(symbol);
        symbols = [];
        highlightIndex = null;
        searchInput.focus();
    };

    const dispatch = createEventDispatcher();
    const handleSubmit = () => {
        if (searchKey.trim() === "") {
            return
        }

        dispatch("addSymbol", searchKey);
    };

    // Navigating over the list of symbols wiith highlighting
    let highlightIndex = null;
    const navigateList = (e) => {
        if (e.key === "ArrowDown") {
            if (highlightIndex <= symbols.length - 1) {
                highlightIndex === null 
                    ? (highlightIndex = 0) 
                    : (highlightIndex += 1);
            }
        } else if (e.key === "ArrowUp" ) {
            if (highlightIndex !== null) {
                highlightIndex === 0
                    ? (highlightIndex = symbols.length - 1)
                    : (highlightIndex -= 1);
            }
        } else if (e.key === "Enter") {
            selectSymbol(symbols[highlightIndex]);
        } else {
            return;
        }
    };
</script>

<svelte:window on:keydown={navigateList} />

<form autocomplete="off" on:submit|preventDefault={handleSubmit}>
    <div class="autocomplete">
        <input
            id="symbol-input"
            type="text"
            placeholder="Search Symbols"
            bind:this={searchInput}
            bind:value={searchKey}
            on:input={() => debounce(fetchSymbols(), 500)}
        />
    </div>

    <input type="submit" value="Add Symbol" />

    {#if symbols.length > 0}
        <ul id="autocomplete-items-list">
            {#each symbols as symbols, i}
                <Item
                    itemLabel={symbols}
                    highlighted={i === highlightIndex}
                    on:click={() => selectSymbol(symbols)}
                />
            {/each}
        </ul>
    {/if}
</form>

<style>
    div.autocomplete {
        position: relative;
        display: inline-block;
        width: 300px;
    }

    input {
        border: 1px solid transparent;
        background-color: #f1f1f1;
        padding: 10px;
        font-size: 16px;
        margin: 0;
    }

    input[type="text"] {
        background-color: #f1f1f1;
        width: 100%;
    }

    input[type="submit"] {
        background-color: DodgerBlue;
        color: #fff;
    }

    #autocomplete-items-list {
        position: relative;
        margin: 0;
        padding: 0;
        top: 0;
        width: 297px;
        border: 1px solid #ddd;
        background-color: #ddd;
    }
</style>
