<script>
// @ts-nocheck

    import { onMount, onDestroy } from "svelte";
    import * as Api from "$lib/api";

    export let selectedSymbol = undefined;
    export let handleBack = undefined;

    let quotes = {};
    let chart = [];
    
    const fetchQuotes = () => {
        quotes = selectedSymbol;
    }

    const fetcher = setInterval(() => fetchQuotes(), 5000);
    onDestroy(() => clearInterval(fetcher));

    // Fetch Last Price Chart of IEX Cloud only oncce
    onMount(() => {
        const fetchChart = async () => {
            await Api.fetchChart(selectedSymbol);
        }
        
        fetchChart();
    });
</script>

<button on:click={handleBack}>
    Back
</button>
{selectedSymbol}
