<script>
    // @ts-nocheck
    export let cellValue = undefined;
    export let rowIndex = -1;
    export let cellOptions = {};
    const handleClick = () => {
        if (cellOptions.action) {
            cellOptions.action(cellValue, rowIndex);
        }
    };
</script>

<button on:click|stopPropagation={handleClick}>
    {cellOptions.label}
</button>

<style>
    button {
        padding: 5px 10px;
    }
</style>
