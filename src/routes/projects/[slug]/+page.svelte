<script lang="ts">
	import Opengraph from '$lib/components/opengraph.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Opengraph
	title={data.post.title}
	keywords={data.post.tags?.join(', ')}
	description={data.post.excerpt}
	image="images/content/projects/{data.post.slug}/{data.post.image}"
	imageTwitter="images/content/projects/{data.post.slug}/{data.post.image}"
	type="article"
/>

{JSON.stringify(data.post)}

<svelte:component this={data.Component} />
