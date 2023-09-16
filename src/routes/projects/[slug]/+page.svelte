<script lang="ts">
	import { base } from '$app/paths';
	import Card from '$lib/components/card.svelte';
	import Opengraph from '$lib/components/opengraph.svelte';
	import type { PageData } from './$types';
	import DateFormat from '$lib/components/date-format.svelte';
	import { DateTime } from 'luxon';

	export let data: PageData;
</script>

<Opengraph
	title={data.post.title}
	keywords={data.post.tags?.join(', ')}
	description={data.post.excerpt}
	image="/images/content/projects/{data.post.slug}/{data.post.image}"
	imageTwitter="/images/content/projects/{data.post.slug}/{data.post.image}"
	type="article"
/>

<div class="columns">
	<div class="column">
		<Card
			img="{base}/images/content/projects/{data.post.slug}/{data.post.image}"
		>
			<h1 class="title is-1">{data.post.title}</h1>
			{#if data.post.subtitle}
				<h2 class="subtitle is-3">{data.post.subtitle}</h2>
			{/if}

			<p class="pb-5 is-size-5 has-text-grey">
				<DateFormat date={data.post.date} format={DateTime.DATE_FULL} />
			</p>

			<div class="content">
				<svelte:component this={data.Component} />
			</div>
		</Card>
	</div>
</div>
