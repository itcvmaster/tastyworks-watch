<script>
	// @ts-nocheck
	import { onMount, onDestroy } from "svelte";
	import { userStore } from "../../lib/store";
	import { Actions } from "../../lib/store/actions";
	import TableView from "./TableView.svelte";
	// import ChartView from "./ChartView.svelte";
	import Table from "../../lib/components/Table/Table.svelte";
	import TabGroup from "../../lib/components/Tabs/TabGroup.svelte";

	let user = {};
	let unsubscribe = userStore.subscribe((u) => (user = u));
	onDestroy(unsubscribe);

	let selectedTab = "";
	let isTableView = true;
	const handleSelectTab = (event) => {
		selectedTab = event.detail;
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
		{#if isTableView}
			<TableView 
				watchId={selectedTab}
			/>
		{/if}
	</TabGroup>
</div>
