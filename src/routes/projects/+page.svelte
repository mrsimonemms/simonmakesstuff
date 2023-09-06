<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';

	export let data: PageData;

	let filter: string | null = null;

	$: posts = data.posts.filter((post) =>
		filter
			? (post.tags ?? []).map((tag) => tag.toLowerCase()).includes(filter)
			: true,
	);

	onMount(() => {
		const tagParam = $page.url.searchParams.get('tag')?.toLowerCase();

		if (!filter && typeof tagParam === 'string') {
			filter = tagParam;
		}
	});
</script>

{JSON.stringify(posts)}
