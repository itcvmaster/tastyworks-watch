<script>
	// @ts-nocheck
	import { onMount, onDestroy } from "svelte";
	import { userStore } from "../../lib/store";
	import { Actions } from "../../lib/store/actions";
	import Table from "../../lib/components/Table/Table.svelte";
	import TabGroup from "../../lib/components/Tabs/TabGroup.svelte";

	let user = {};
	let symbols = [];
	let unsubscribe = userStore.subscribe((u) => (user = u));
	onDestroy(unsubscribe);

	let headers = [];
	let tableData = [];
	const handleSelectTab = (event) => {
		headers = [
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
		];
		tableData = user.watches && user.watches[event.detail] || [];
	}

	const handleClickCell = (event) = {

	}

	const handleCreateTab = (event) => {
		userStore.dispatch({
			type: Actions.CREATE_WATCH,
			payload: { displayName: event.detail },
		});
	};

	const handleCloseTab = (event) => {
		userStore.dispatch({
			type: Actions.DELETE_WATCH,
			payload: { watchId: event.detail },
		});
	};
</script>

<svelte:head>
	<title>Watch Lists</title>
	<meta name="WatchLists" content="Show informations of selected symbols" />
</svelte:head>

<div class="container">
	<h1>Trading Quotes</h1>
	<TabGroup
		tabs={user.watches}
		on:closeTab={handleCloseTab}
		on:createTab={handleCreateTab}
		on:selectTab={handleSelectTab}
	>
		{#if true}
			<Table 
				headers={headers}
				tableData={tableData}
			/>
		{/if}
	</TabGroup>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		width: 100%;
	}
</style>
