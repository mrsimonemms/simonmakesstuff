<script>
	import Footer from '$lib/components/footer.svelte';
	import Nav from '$lib/components/navigation.svelte';
	import '../app.scss';
</script>

<Nav />

<div class="site-content">
	<div class="container my-5">
		<slot />
	</div>
</div>

<Footer />

<style lang="scss">
	.site-content {
		flex: 1;
	}
</style>
