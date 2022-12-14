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

	const handleSelectTab = (event) => {

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
        <slot></slot>
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
