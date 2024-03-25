<script lang="ts">
	import { PUBLIC_TWITTER_USER as twitterUser } from '$env/static/public';

	const currentYear = new Date().getUTCFullYear();
	// eslint-disable-next-line no-undef
	const description = __DESCRIPTION__;
</script>

<footer class="has-background-black-ter has-text-white py-6">
	<div class="container">
		<div class="columns has-text-centered-touch">
			<div class="column is-half">{description}</div>

			<div class="column is-half has-text-right-desktop">
				<a
					href="https://twitter.com/{twitterUser}"
					target="_blank"
					class="icon has-text-white"
				>
					<i class="mdi mdi-24px mdi-twitter"></i>
				</a>
			</div>
		</div>
		<hr class="has-background-grey-dark" />
		<p class="has-text-centered">
			&copy; {currentYear} Simon Emms
		</p>
		<p class="has-text-centered">
			This site is open source.
			<a
				class="has-text-link-light"
				href="https://github.com/mrsimonemms/simonmakesstuff"
				target="_blank"
			>
				Improve this page
			</a>
		</p>
	</div>
</footer>
