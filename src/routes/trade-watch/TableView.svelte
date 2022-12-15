<script>
    // @ts-nocheck
    import { onDestroy } from "svelte";
    import { userStore } from "$lib/store";
    import { Actions } from "$lib/store/actions";
    import Table from "$lib/components/Table/Table.svelte";
    import ActionCellRenderer from "$lib/components/Table/ActionCellRenderer.svelte";
    import AutoComplete from "$lib/components/AutoComplete/AutoComplete.svelte";

    let user = {};
    let unsubscribe = userStore.subscribe((u) => (user = u));
    onDestroy(unsubscribe);

    export let watchId = "";
    let tableData = [];
    const fetchQuotes = (id) => {
        const symbols = user?.watches[id]?.symbols || [];
        tableData = (symbols || []).map((symbol) => ({
            symbol: symbol,
            desc: symbol + "'s Description" + Date.now(),
            bid_price: symbol + "'s Bid Price'",
            ask_price: symbol + "'s Ask Price",
            last_price: symbol + "'s Last Price",
        }));
    }
    $: fetchQuotes(watchId);

    const fetcher = setInterval(() => fetchQuotes(watchId), 5000);
    onDestroy(() => clearInterval(fetcher));

    // const handleClickCell = (event) => {

    // }

    const handleDeleteSymbol = (_cellValue, rowIndex) => {
        userStore.dispatch({
            type: Actions.DELETE_SYMBOL,
            payload: {
                watchId: watchId,
                symbol: tableData[rowIndex]?.symbol
            }
        });

        tableData = tableData.filter((_, index) => (index != rowIndex));
    }

    const handleAddSymbol = (event) => {
        userStore.dispatch({
            type: Actions.ADD_SYMBOL,
            payload: {
                watchId: watchId,
                symbol: event.detail
            }
        });
    }

    export let handleViewSymbol;
    const handleRowClick = (rowIndex) => {
        const symbol = tableData[rowIndex].symbol;
        handleViewSymbol && handleViewSymbol(symbol);
    }
    
    const headers = [
        {
            label: "Stock Symbol",
            dataKey: "symbol",
        },
        {
            label: "Description",
            dataKey: "desc",
        },
        {
            label: "Bid Price",
            dataKey: "bid_price",
        },
        {
            label: "Ask Price",
            dataKey: "ask_price",
        },
        {
            label: "Last Price",
            dataKey: "last_price",
        },
        {
            label: "Action",
            dataKey: "-",
            cellRenderer: ActionCellRenderer,
            cellOptions: {
                label: "Delete",
                action: handleDeleteSymbol
            }
        },
    ];
</script>

<svelte:head>
    <title>Table View</title>
    <meta
        name="Trade - Table View"
        content="Show informations of selected symbols"
    />
</svelte:head>

<div class="container">
    <AutoComplete 
        on:addSymbol={handleAddSymbol}
    />
    <Table 
        headers={headers} 
        tableData={tableData}
        handleRowClick={handleRowClick}
    />
</div>
