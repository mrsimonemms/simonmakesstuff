<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import {
		PUBLIC_DOMAIN_NAME as domainName,
		PUBLIC_TWITTER_USER as twitterUser,
	} from '$env/static/public';

	const siteTitle = 'Simon Makes Stuff';

	export let description =
		"These are some of the projects I've made over the years, what I've learned and how I built them.";
	export let title = 'Untitled Page';
	export let type: 'article' | 'website' = 'website';
	export let image = '/images/logo.png';
	export let imageTwitter = '/images/logo.png';
	export let norobots = false;
	export let keywords: string[] = [
		'beekeeping',
		'crafts',
		'diy',
		'projects',
		'woodworking',
	];
	export let useTwitterSummaryImage = true;
</script>

<svelte:head>
	<title>{siteTitle} | {title}</title>
	<meta name="keywords" content={keywords.join(', ')} />
	<meta name="description" content={description} />

	{#if norobots}
		<meta name="robots" content="noindex" />
	{/if}

	<!-- https://ogp.me -->
	<meta property="og:image" content="{domainName}{base}{image}" />
	<meta property="og:description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content="{domainName}{$page.url.pathname}" />

	<!-- https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup -->
	<meta
		name="twitter:card"
		content={useTwitterSummaryImage ? 'summary' : 'summary_large_image'}
	/>
	<meta name="twitter:site" content="@{twitterUser}" />
	<meta name="twitter:creator" content="@{twitterUser}" />
	<meta name="twitter:image" content="{domainName}{base}{imageTwitter}" />
</svelte:head>
