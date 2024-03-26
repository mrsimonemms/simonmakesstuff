<script lang="ts">
	import Hero from '$lib/components/hero.svelte';
	import type { PageData } from './$types';
	import DateFormat from '$lib/components/date-format.svelte';
	import { DateTime } from 'luxon';
	import Opengraph from '$lib/components/opengraph.svelte';

	export let data: PageData;

	$: postIndex = data.posts.findIndex(
		({ slug }) => slug === data.post.post.slug,
	);
	$: next = data.posts[postIndex + 1] ?? null;
	$: previous = data.posts[postIndex - 1] ?? null;

	$: post = data.post.post;
</script>

<Opengraph
	title={post.title}
	description={post.excerpt}
	image="/img/content/posts/{post.slug}/{post.image}"
	imageTwitter="/img/content/posts/{post.slug}/{post.image}"
	type="article"
	keywords={post.tags}
/>

<Hero
	title={post.title}
	subtitle={post.subtitle}
	img="/img/content/posts/{post.slug}/{post.image}"
/>

<section class="section">
	<div class="container">
		<div class="columns">
			<div class="column is-two-thirds">
				<p class="is-size-7 has-text-grey has-text-right">
					Published:
					<DateFormat date={post.date} format={DateTime.DATE_FULL} />
				</p>

				<div class="content">
					<svelte:component this={data.post.Component} />
				</div>

				<hr />

				<div class="columns">
					{#if previous}
						<div class="column is-half">
							<p class="title is-6">
								<span class="icon">
									<i class="mdi mdi-18px mdi-arrow-left"></i>
								</span>
								Previous
							</p>
							<p>
								<a href="/projects/{previous.slug}">{previous.title}</a>
							</p>
						</div>
					{/if}

					{#if next}
						<div
							class="column is-half has-text-right"
							class:is-offset-half={!previous}
						>
							<p class="title is-6">
								Next
								<span class="icon">
									<i class="mdi mdi-18px mdi-arrow-right"></i>
								</span>
							</p>

							<p>
								<a href="/projects/{next.slug}">{next.title}</a>
							</p>
						</div>
					{/if}
				</div>

				{#if post.credit}
					<div class="credits">
						<h3 class="is-size-3">Credits</h3>
						<p>
							Photo by <a href={post.credit.link} target="_blank"
								>{post.credit.text}</a
							>
						</p>
					</div>
				{/if}
			</div>

			<div class="column is-one-third">
				<div class="card">
					<header class="card-header">
						<p class="card-header-title">About the author</p>
					</header>
					<div class="card-content">@todo</div>
				</div>

				<div class="card">
					<header class="card-header">
						<p class="card-header-title">Tags</p>
					</header>
					<div class="card-content">
						<div class="tags are-medium">
							{#each post.tags as tag}
								<a href="/projects?tag={tag}" class="tag">{tag}</a>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
