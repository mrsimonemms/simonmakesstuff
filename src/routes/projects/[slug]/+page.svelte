<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{JSON.stringify(data.post)}

<svelte:component this={data.Component} />
