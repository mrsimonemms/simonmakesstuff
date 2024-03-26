<script lang="ts">
	import Opengraph from '$lib/components/opengraph.svelte';
</script>

<Opengraph title="Stuff What I Have Made" />

<section class="hero is-large">
	<div class="container">
		<div class="hero-body">
			<div class="has-background-black-ter is-inline-block p-5">
				<p class="title has-text-white-ter">Hero title</p>
				<p class="subtitle has-text-white-ter">Hero subtitle</p>
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.hero {
		background: {
			image: url('/img/homepage/banner.jpg');
			position: center center;
			size: cover;
		}
	}
</style>
