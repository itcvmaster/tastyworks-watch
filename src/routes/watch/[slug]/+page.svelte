<script>
    // @ts-nocheck
    import { onDestroy } from "svelte";
    import { page } from "$app/stores";
    import * as Api from "$lib/api";
    import { userStore } from "$lib/store";
    import { Actions } from "$lib/store/actions";
    import { Table, ActionCellRenderer, AutoComplete } from "$lib/components";
    import { goto } from "$app/navigation";
    
    let user = {};
    let unsubscribe = userStore.subscribe((u) => (user = u));
    onDestroy(unsubscribe);

    let tableData = [];
    const fetchQuotes = async (id) => {
        const symbols = user?.watches[id]?.symbols || [];
        tableData = await Api.fetchQuotes(symbols);
    }

    let watchId = $page.params.slug;
    $: {
        watchId = $page.params.slug;
        fetchQuotes(watchId);
    }
    const fetcher = setInterval(() => fetchQuotes(watchId), 5000);
    onDestroy(() => clearInterval(fetcher));


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

        fetchQuotes(watchId);
    }

    const handleRowClick = (rowIndex) => {
        const symbol = tableData[rowIndex].symbol;
        goto(`/chart-view/${symbol}`);
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
