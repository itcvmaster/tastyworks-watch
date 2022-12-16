<script>
    // @ts-nocheck

    import { onMount, onDestroy } from "svelte";
    import * as Api from "$lib/api";
    import { Chart } from "$lib/components";

    export let selectedSymbol = undefined;
    export let handleBack = undefined;

    let quotes = {};
    let chart = [];

    const fetchQuotes = async (symbol) => {
        const data = await Api.fetchQuotes([symbol]);
        if (data.length > 0) {
            quotes = data[0];
        } else {
            console.log("[Error in fetching quotes]: Data is invalid format");
        }
    };

    const fetcher = setInterval(() => fetchQuotes(selectedSymbol), 5000);
    onDestroy(() => clearInterval(fetcher));

    // Fetch Last Price Chart of IEX Cloud only oncce
    onMount(() => {
        const fetchChart = async () => {
            chart = await Api.fetchChart(selectedSymbol);
        };

        fetchChart();
    });

    $: fetchQuotes(selectedSymbol);
</script>

<div class="container relative">
    <div class="quotes">
        <span>
            <h5>Stock Symbol</h5>
            <p>{quotes.symbol}</p>
        </span>
        <span>
            <h5>Description</h5>
            <p>{quotes.desc}</p>
        </span>
        <span>
            <h5>Ask Price</h5>
            <p>{quotes.ask_price}</p>
        </span>
        <span>
            <h5>Bid Price</h5>
            <p>{quotes.bid_price}</p>
        </span>
        <span>
            <h5>Last Price</h5>
            <p>{quotes.last_price}</p>
        </span>
    </div>

    <div class="chart-view">
        <Chart
            points={chart}
            xTicksCount={5}
            yTicksCount={5}
        />
    </div>

    <button class="top-corner" on:click={handleBack}> {"←"} </button>
</div>

<style>
    .relative {
        position: relative;
    }
    h5,
    p {
        margin: 10px 10px;
    }
    .quotes {
        display: flex;
        text-align: center;
    }

    .chart-view {
        width: 100%;
    }

    .top-corner {
        position: absolute;
        top: 10px;
        left: 10px;
    }
</style>
