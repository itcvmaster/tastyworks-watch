<script>
	// @ts-nocheck
	import { onDestroy } from "svelte";
	import { userStore } from "$lib/store";
	import { Actions } from "$lib/store/actions";
	import TableView from "./TableView.svelte";
	import ChartView from "./ChartView.svelte";
	import TabGroup from "$lib/components/Tabs/TabGroup.svelte";

	let user = {};
	let unsubscribe = userStore.subscribe((u) => (user = u));
	onDestroy(unsubscribe);

	let selectedTab = "";
	let selectedSymbol = "";
	let isTableView = true;
	const handleSelectTab = (tab) => {
		selectedTab = tab;
	}

	const handleCreateTab = (displayName) => {
		const watchId = `${Date.now()}`;
		userStore.dispatch({
			type: Actions.CREATE_WATCH,
			payload: { watchId, displayName },
		});

		selectedTab = watchId;
	};

	const handleCloseTab = (watchId) => {
		userStore.dispatch({
			type: Actions.DELETE_WATCH,
			payload: { watchId },
		});
	};

	const handleViewSymbol = (symbol) => {
		selectedSymbol = symbol;
		isTableView = false;
	}

	const handleBack = () => {
		isTableView = true;
	}
</script>

<svelte:head>
	<title>Watch Lists</title>
	<meta name="WatchLists" content="Show informations of selected symbols" />
</svelte:head>

<div class="container">
	<h1>Trading Quotes</h1>
	<TabGroup
		tabs={user.watches}
		selectedTab={selectedTab}
		handleCloseTab={handleCloseTab}
		handleCreateTab={handleCreateTab}
		handleSelectTab={handleSelectTab}
	>
		{#if isTableView}
			<TableView 
				watchId={selectedTab}
				handleViewSymbol={handleViewSymbol}
			/>
		{:else}
			<ChartView 
				selectedSymbol={selectedSymbol}
				handleBack={handleBack}
			/>
		{/if}
	</TabGroup>
</div>
