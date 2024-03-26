<script lang="ts">
	export let title: string;
	export let subtitle: string | undefined = undefined;
	export let img: string;
	export let size: 'small' | 'medium' | 'large' = 'medium';
</script>

<section class="hero is-{size}" style="background-image: url('{img}');">
	<div class="container">
		<div class="hero-body">
			<div class="has-background-black-ter is-inline-block p-5">
				<p class="title has-text-white-ter">{title}</p>
				{#if subtitle}
					<p class="subtitle has-text-white-ter">{subtitle}</p>
				{/if}
			</div>
		</div>
	</div>
</section>

<style lang="scss">
	.hero {
		background: {
			position: center center;
			size: cover;
		}
	}
</style>
