<script>
// @ts-nocheck

    import StringCellRenderer from "./StringCellRenderer.svelte";
    export let handleRowClick;
    export let headers = [
        // {
        //     label: "No",
        //     dataKey: "AUTO_INC", // preserved
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
    export let transform = (data) => data;
    
    $: data = transform(tableData);
</script>

{#if data.length > 0}
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
            <!-- svelte-ignore missing-declaration -->
            <tr on:click={() => handleRowClick(dataIndex)}>
                {#each headers as header (header.dataKey)}
                {@const CellRenderer = header.cellRenderer || StringCellRenderer}
                    <td>
                        <CellRenderer 
                            cellValue={rowData[header.dataKey]}
                            cellOptions={header.cellOptions || {}}
                            rowIndex={dataIndex || 0}
                        />
                    </td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>
{:else}
<div class="empty">
    No data to be displayed
</div>
{/if}
<style>
    .empty {
        display: flex;
        min-height: 400px;
        align-items: center;
    }
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
        cursor: pointer;
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
