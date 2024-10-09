<!-- ****************************************************** SCRIPT -->
<script lang="ts">
	import '../style/reset.css';
	import '../style/main.css';
	import 'aos/dist/aos.css';
	import AOS from 'aos';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

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
<slot />

<!-- ****************************************************** STYLE -->
<style>
</style>
