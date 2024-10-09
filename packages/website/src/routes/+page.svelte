<script lang="ts">
	import { createOrUpdateEmplacement, subscribe } from '$lib/graphql';
	import type Emplacement from '$lib/models/emplacement.js';
	import { onMount } from 'svelte';

	export let data;

	const GRID_SIZE = 10;
	const BLANK_COLOR = '#ffffff';

	let color = '#ff0000';
	const emplacementColors: Array<string> = new Array(GRID_SIZE * GRID_SIZE).fill(BLANK_COLOR);
	for (const emplacementCase of data.cases) {
		emplacementColors[emplacementCase.x * GRID_SIZE + emplacementCase.y] = emplacementCase.color;
	}

	async function handleClick(i: number, j: number) {
		console.log('clicked', i, j);

		try {
			const emplacements = (await createOrUpdateEmplacement(i, j, color)) as Emplacement;
			emplacementColors[i * GRID_SIZE + j] = emplacements.color;
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

	<p>Received from the server: {data.cases.length}</p>

	<div class="color-container">
		<p>select a color:</p>
		<input type="color" id="head" name="head" bind:value={color} />
	</div>

	<div class="grid">
		{#each Array.from({ length: GRID_SIZE }, (_, i) => i) as i}
			{@const emplacementColorLine = i * GRID_SIZE}
			<div class="row">
				{#each Array.from({ length: GRID_SIZE }, (_, j) => j) as j}
					{@const emplacementColor = emplacementColors[emplacementColorLine + j]}
					<button on:click={() => handleClick(i, j)}>
						<div class="cell" style={`background-color: ${emplacementColor};`}></div>
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
		border: 1px solid #ccc;
	}
</style>
