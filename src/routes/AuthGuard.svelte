<script>
// @ts-nocheck

    import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { userStore } from "$lib/store";
	
	$: if (!$userStore.isInitialized) {
		goto("/login");
	}

	$: if ($userStore.isInitialized) {
		if ($page.path && $page.path?.startsWith("/login")) {
			goto("/");
		}
	}
</script>

{#if $userStore.isInitialized}
	<slot name="opted"></slot>
{:else}
	<slot name="not_opted"></slot>
{/if}
