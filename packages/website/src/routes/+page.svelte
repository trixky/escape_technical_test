<script lang="ts">
	import { createOrUpdateEmplacement, subscribe } from '$lib/graphql';
	import { onMount } from 'svelte';

	export let data;

	let color = '#ff0000';

	const GRID_SIZE = 10;

	$: displayed = JSON.stringify(data, null, 2);

	async function handleClick(i: number, j: number) {
		console.log('clicked', i, j);

		try {
			const emplacements = await createOrUpdateEmplacement(i, j, color);
			console.log('Emplacements:', emplacements);
		} catch (error: any) {
			alert('Erreur lors de la récupération des emplacements:');
			console.error(error);
		}
	}

	onMount(() => {
		const unsubscribe = subscribe(/* GraphQL */ 'subscription { hello }', (data) => {
			console.log('Received from the server:', data);
		});

		return unsubscribe;
	});
</script>

<div class="global-container">
	<h1>r/ploce</h1>

	<p>Received from the server: {displayed}</p>

	<div class="color-container">
		<p>select a color:</p>
		<input type="color" id="head" name="head" bind:value={color} />
	</div>

	<div class="grid">
		{#each Array.from({ length: GRID_SIZE }, (_, i) => i) as i}
			<div class="row">
				{#each Array.from({ length: GRID_SIZE }, (_, j) => j) as j}
					<button on:click={() => handleClick(i, j)}>
						<div class="cell"></div>
					</button>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.global-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
		padding: 20px;
	}

	.color-container {
		display: flex;
		align-items: center;
		gap: 10px;
	}
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
