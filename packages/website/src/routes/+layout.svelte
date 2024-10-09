<!-- ****************************************************** SCRIPT -->
<script lang="ts">
	import '../style/reset.css';
	import '../style/main.css';
	import 'aos/dist/aos.css';
	import AOS from 'aos';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Header from '$lib/components/layout/header.svelte';
	import Footer from '$lib/components/layout/footer.svelte';

	onMount(() => {
		if (browser)
			AOS.init({
				duration: 800
				// once: false
				// disable: 'mobile',
			});
	});
</script>

<!-- ****************************************************** CONTENT -->
<div class="layout-container">
	<Header />
	<main>
		<slot />
	</main>
	<Footer />
</div>

<!-- ****************************************************** STYLE -->
<style>
	.layout-container {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
