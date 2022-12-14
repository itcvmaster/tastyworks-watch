<script>
// @ts-nocheck

    import StringCellRenderer from "./StringCellRenderer.svelte";

    export let headers = [
        // {
        //     label: "No",
        //     dataKey: "AUTO_INC", // presevered
        //     cellRenderer: StringCellRenderer,
        //     cellOptions: {}
        // },
        // {
        //     label: "Stock Symbol",
        //     dataKey: "symbol",
        //     cellRenderer: StringCellRenderer,
        //     cellOptions: {}
        // },
    ];
    export let tableData = [
        // {
        //     "symbol": "AAPL",
        //     "bid_price": "$0.01",
        // },
    ];
    export let transform = (data) => [
        {"symbol": "AAPL1", "desc":"AAPL", "bid_price": 1, "ask_price":2, "last_price":3},
        {"symbol": "AAPL2", "desc":"AAPL", "bid_price": 1, "ask_price":2, "last_price":3},
        {"symbol": "AAPL3", "desc":"AAPL", "bid_price": 1, "ask_price":2, "last_price":3},
        {"symbol": "AAPL4", "desc":"AAPL", "bid_price": 1, "ask_price":2, "last_price":3},
        {"symbol": "AAPL5", "desc":"AAPL", "bid_price": 1, "ask_price":2, "last_price":3},
        {"symbol": "AAPL6", "desc":"AAPL", "bid_price": 1, "ask_price":2, "last_price":3},
    ];
    
    $: data = transform(tableData);
</script>

<table>
    <thead>
        <tr>
            {#each headers as header (header.dataKey)}
                <th>{header.label}</th>
            {/each}
        </tr>
    </thead>

    <tbody>
        {#each data as rowData, dataIndex}
            <tr>
                {#each headers as header (header.dataKey)}
                {@const CellRenderer = header.cellRenderer || StringCellRenderer}
                    <td>
                        <CellRenderer 
                            cellValue={rowData[header.dataKey]}
                        />
                    </td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

<style>
    table {
        border-collapse: collapse;
        table-layout: auto;
        width: 100%;
    }

    th:not(:first-child) {
        border-left: 1px solid white;
    }

    thead > tr {
        background-color: gray;
        color: white;
        padding: 10px;
    }

    tbody > tr {
        background-color: lightgray;
    }

    tbody > tr:nth-child(2n) {
        background-color: #efefef;
    }

    th,
    td {
        border: 1px solid white;
        padding: 5px 10px;
        overflow: hidden;
    }
</style>
