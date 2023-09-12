<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	import Card from '$lib/components/card.svelte';
	import DateFormat from '$lib/components/date-format.svelte';
	import { DateTime } from 'luxon';
	import { goto } from '$app/navigation';
	import Opengraph from '$lib/components/opengraph.svelte';

	export let data: PageData;

	let filter: string | null = null;

	$: posts = data.posts.filter((post) =>
		filter ? post.tags?.includes(filter) : true,
	);

	onMount(() => {
		const tagParam = $page.url.searchParams.get('tag');

		if (!filter && typeof tagParam === 'string') {
			filter = tagParam;
		}
	});

	function selectTag(tag: string): undefined {
		if (tag === filter) {
			goto(`${base}/projects`, { keepFocus: true, noScroll: true });
			filter = '';
			return;
		}
		let query = new URLSearchParams($page.url.searchParams.toString());
		query.set('tag', tag);
		goto(`?${query.toString()}`, { keepFocus: true, noScroll: true });
		filter = tag;
	}
</script>

<Opengraph title="My Projects" />

<h1 class="is-size-1">My Projects</h1>

<div class="content is-large">
	<p>These are some of the things I've made</p>
</div>

<div class="columns is-multiline">
	{#each posts as post, key}
		<div class="column" class:is-half={key < 2} class:is-one-quarter={key >= 2}>
			<a href="{base}/projects/{post.slug}">
				<Card img="{base}/images/content/projects/{post.slug}/{post.image}">
					<h2 class="title">{post.title}</h2>
					{#if post.subtitle}
						<h3 class="subtitle">{post.subtitle}</h3>
					{/if}

					<div class="content">
						{post.excerpt}
					</div>

					<div class="tags are-medium">
						{#each post.tags ?? [] as tag}
							<a
								href="{base}/projects{tag !== filter ? `?tag=${tag}` : ''}"
								class="tag"
								data-sveltekit-noscroll
								on:click|preventDefault={selectTag(tag)}
							>
								{tag}
							</a>
						{/each}
					</div>

					<p class="is-size-7 has-text-grey has-text-right">
						Published:
						<DateFormat date={post.date} format={DateTime.DATE_FULL} />
					</p>
				</Card>
			</a>
		</div>
	{/each}
</div>
