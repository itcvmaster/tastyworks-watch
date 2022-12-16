<script>
	// @ts-nocheck
	import { onDestroy } from "svelte";
	import { userStore } from "$lib/store";
	import { Actions } from "$lib/store/actions";
	import TableView from "./TableView.svelte";
	import ChartView from "./ChartView.svelte";
	import { TabGroup, InputDialog } from "$lib/components";

	// Get User Data from store
	let user = {};
	let unsubscribe = userStore.subscribe((u) => (user = u));
	onDestroy(unsubscribe);

	// Creating a new watch list
	let showInputModal = false;
	const onClose = () => (showInputModal = false);
	const onOK = (displayName) => {
		showInputModal = false;
		const watchId = `${Date.now()}`;
		userStore.dispatch({
			type: Actions.CREATE_WATCH,
			payload: { watchId, displayName },
		});

		selectedTab = watchId;
	};

	const handleCreateTab = () => {
		showInputModal = true;
	};

	// Selecting & Closing Tabs
	let selectedTab = "";
	let selectedSymbol = "";
	const handleSelectTab = (tab) => {
		selectedTab = tab;
	};

	const handleCloseTab = (watchId) => {
		userStore.dispatch({
			type: Actions.DELETE_WATCH,
			payload: { watchId },
		});
	};

	// Switching Table/Chart View.
	// This should be refactored using Router.
	// ex:) /trade-watch/chart/{symbol}, /trade-watch/table/{watchListId}
	let isTableView = true;
	const handleViewSymbol = (symbol) => {
		selectedSymbol = symbol;
		isTableView = false;
	};

	const handleBack = () => {
		isTableView = true;
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
		{selectedTab}
		{handleCloseTab}
		{handleCreateTab}
		{handleSelectTab}
	>
		{#if isTableView}
			<TableView watchId={selectedTab} {handleViewSymbol} />
		{:else}
			<ChartView {selectedSymbol} {handleBack} />
		{/if}
	</TabGroup>

	{#if showInputModal}
		<!-- svelte-ignore missing-declaration -->
		<InputDialog 
			title={"Input Watch List Title."}
			onOK={onOK}
			onClose={onClose}
		/>
	{/if}
</div>
