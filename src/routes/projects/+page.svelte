<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import Hero from '$lib/components/hero.svelte';
	import DateFormat from '$lib/components/date-format.svelte';
	import { DateTime } from 'luxon';
	import type { LayoutData } from './$types';
	import Opengraph from '$lib/components/opengraph.svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';

	export let data: LayoutData;

	const title = 'My projects';

	let filteredPosts = false;
	let { posts } = data;
	let filter: string | null = null;

	afterNavigate(() => {
		filter = $page.url.searchParams.get('tag');

		filteredPosts = filter !== null;
		posts = data.posts;

		if (filteredPosts) {
			posts = posts.filter(({ tags }) => tags.includes(filter));
		}
	});
</script>

<Opengraph {title} />

<Hero
	{title}
	subtitle="Some of the things I've made"
	img="/img/homepage/banner.jpg"
/>

{#if filteredPosts}
	<section class="section">
		<div class="container">
			<h2 class="is-size-2">Tags</h2>
			<span class="tag is-large">{filter}</span>

			<a class="button pb-2" href="/projects" data-sveltekit-noscroll>
				<span>Clear filters</span>
				<span class="icon is-small">
					<i class="mdi mdi-close" />
				</span>
			</a>

			<hr />
		</div>
	</section>
{/if}

<section class="section">
	<div class="container">
		<div class="columns is-multiline">
			{#each posts as post, key}
				<div
					class="column"
					class:is-half={key < 2}
					class:is-one-quarter={key >= 2}
				>
					<Card
						href="/projects/{post.slug}"
						img="/img/content/posts/{post.slug}/{post.image}"
					>
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
									href="/projects{tag !== filter ? `?tag=${tag}` : ''}"
									class="tag"
									data-sveltekit-noscroll
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
				</div>
			{/each}
		</div>
	</div>
</section>
