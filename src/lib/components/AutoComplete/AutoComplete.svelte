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
    const handleAddSymbol = () => {
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
                highlightIndex === null || highlightIndex >= symbols.length - 1
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

<div class="box">
    <div class="autocomplete">
        <input
            id="symbol-input"
            type="text"
            placeholder="Search Symbols"
            bind:this={searchInput}
            bind:value={searchKey}
            on:input={() => debounce(fetchSymbols, 200)}
        />

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
    </div>
    <button on:click={handleAddSymbol}>Add Symbol</button>
</div>

<style>
    div.box {
        display: flex;
        gap: 30px;
        margin-bottom: 30px;
    }

    div.autocomplete {
        position: relative;
        display: flex;
        width: 300px;
    }

    input {
        border: 1px solid transparent;
        background-color: #f1f1f1;
        font-size: 16px;
        margin: 0;
    }

    input[type="text"] {
        background-color: #f1f1f1;
        border: 1px solid #cdcdcd;
        border-radius: 4px;
        width: 100%;
        padding: 10px;
    }

    button {
        cursor: pointer;
    }

    #autocomplete-items-list {
        position: absolute;
        margin: 0;
        padding: 0;
        top: 40px;
        width: 100%;
        max-height: 300px;
        overflow-y: auto;
        border: 1px solid #ddd;
        background-color: #ddd;
    }
</style>
