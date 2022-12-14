<script>
	import { userStore } from "../lib/store";
</script>

{#if $userStore.first}
	<slot name="opted"></slot>
{:else}
	<slot name="not_opted"></slot>
{/if}