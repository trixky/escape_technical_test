<script lang="ts">
	import { subscribe } from '$lib/graphql';
	import { onMount } from 'svelte';

	export let data;
	const GRID_SIZE = 10;

	$: displayed = JSON.stringify(data, null, 2);

	onMount(() => {
		const unsubscribe = subscribe(/* GraphQL */ 'subscription { hello }', (data) => {
			console.log('Received from the server:', data);
		});

		return unsubscribe;
	});
</script>

<h1>r/ploce</h1>

<p>Received from the server: {displayed}</p>

<div class="grid">
	{#each Array.from({ length: GRID_SIZE }, (_, i) => i) as i}
		<div class="row">
			{#each Array.from({ length: GRID_SIZE }, (_, j) => j) as j}
				<div class="cell"></div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.grid {
		display: flex;
		flex-direction: column;
	}

	.row {
		display: flex;
		flex-direction: row;
	}

	.cell {
		width: 20px;
		height: 20px;
		background-color: #f0f0f0;
		border: 1px solid #ccc;
	}
</style>
