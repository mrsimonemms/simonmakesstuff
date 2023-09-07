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

<nav class="navbar is-dark" aria-label="main navigation">
	<div class="container">
		<div class="navbar-brand">
			<a class="navbar-item" href="{base}/">
				<img
					src="https://bulma.io/images/bulma-logo-white.png"
					width="112"
					height="28"
					alt="Logo"
				/>
			</a>

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
			<div class="navbar-start">
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

			<div class="navbar-end"></div>
		</div>
	</div>
</nav>
