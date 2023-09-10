<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import { page } from '$app/stores';

	$: displayNav = false;

	$: menuBar = [
		{
			name: 'Home',
			link: `${base}/`,
			exactMatch: true,
		},
		{
			name: 'Projects',
			link: '/projects',
			exactMatch: false,
		},
	];

	afterNavigate(() => {
		displayNav = false;
	});
</script>

<div class="section p-0">
	<div class="container">
		<a class="logo py-2 is-flex is-justify-content-center" href="{base}/">
			<img src="{base}/images/logo.png" alt="Simon Makes Stuff" />
		</a>
	</div>
</div>

<nav class="navbar is-dark" aria-label="main navigation">
	<div class="container">
		<div class="navbar-brand">
			<span
				class="navbar-burger"
				aria-hidden="true"
				data-target="navbarExpansion"
				on:click={() => (displayNav = !displayNav)}
			>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
				<span aria-hidden="true"></span>
			</span>
		</div>

		<div id="navbarExpansion" class="navbar-menu" class:is-active={displayNav}>
			<div class="navbar-start is-flex-grow-1 is-justify-content-center">
				{#each menuBar as item}
					<a
						href={item.link}
						class="navbar-item"
						class:is-active={item.exactMatch
							? $page.route.id === item.link
							: $page.route.id?.startsWith(item.link)}
					>
						{item.name}
					</a>
				{/each}
			</div>
		</div>
	</div>
</nav>

<style lang="scss">
	.logo {
		img {
			max: {
				height: 6rem;
			}
		}
	}
</style>
