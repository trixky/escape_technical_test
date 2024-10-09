<script lang="ts">
	import { createOrUpdateEmplacement, subscribe } from '$lib/graphql';
	import type Emplacement from '$lib/models/emplacement.js';
	import { onMount } from 'svelte';

	export let data;

	// ****************** grid and color
	const GRID_SIZE = 50;
	const BLANK_COLOR = '#ffffff';
	let color = '#ff0000';
	const emplacementColors: Array<string> = new Array(GRID_SIZE * GRID_SIZE).fill(BLANK_COLOR);
	for (const emplacementCase of data.cases) {
		emplacementColors[emplacementCase.x * GRID_SIZE + emplacementCase.y] = emplacementCase.color;
	}
	// ****************** keyboard control
	let KeyboardFocus = false;
	let xKeyboardFocus = 0;
	let yKeyboardFocus = 0;

	function handleKeyDown(event: KeyboardEvent) {
		let newKeyboardFocus = true;
		switch (event.key) {
			case 'ArrowUp':
				xKeyboardFocus = Math.max(0, xKeyboardFocus - 1);
				break;
			case 'ArrowDown':
				xKeyboardFocus = Math.min(GRID_SIZE - 1, xKeyboardFocus + 1);
				break;
			case 'ArrowLeft':
				yKeyboardFocus = Math.max(0, yKeyboardFocus - 1);
				break;
			case 'ArrowRight':
				yKeyboardFocus = Math.min(GRID_SIZE - 1, yKeyboardFocus + 1);
				break;
			case 'Enter':
			case ' ':
				event.preventDefault();
				handlePaint(xKeyboardFocus, yKeyboardFocus);
				break;
			default:
				newKeyboardFocus = false;
		}
		if (newKeyboardFocus) KeyboardFocus = true;
	}

	window.addEventListener('keydown', handleKeyDown);

	async function handlePaint(i: number, j: number) {
		console.log('clicked', i, j);

		try {
			const paintEmplacement = (await createOrUpdateEmplacement(i, j, color)) as Emplacement;
			emplacementColors[paintEmplacement.x * GRID_SIZE + paintEmplacement.y] =
				paintEmplacement.color;
			KeyboardFocus = true;
			xKeyboardFocus = paintEmplacement.x;
			yKeyboardFocus = paintEmplacement.y;
		} catch (error: any) {
			alert('Erreur lors de la récupération des emplacements:');
			console.error(error);
		}
	}

	onMount(() => {
		const unsubscribe = subscribe(/* GraphQL */ 'subscription { hello }', (data) => {
			console.log('Received from the server:', data);
		});

		return () => {
			unsubscribe();
			window.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

<div class="global-container">
	<h1>r/place</h1>

	<div class="color-container">
		<p>Select your</p>
		<input type="color" id="head" name="head" bind:value={color} />
		<p>and fight!</p>
	</div>

	<div class="grid">
		{#each Array.from({ length: GRID_SIZE }, (_, i) => i) as i}
			{@const emplacementColorLine = i * GRID_SIZE}
			<div class="row">
				{#each Array.from({ length: GRID_SIZE }, (_, j) => j) as j}
					{@const emplacementColor = emplacementColors[emplacementColorLine + j]}
					{@const focused = KeyboardFocus && i === xKeyboardFocus && j === yKeyboardFocus}
					<button tabindex="-1" on:click={() => handlePaint(i, j)}>
						<div class="cell" class:focused style={`background-color: ${emplacementColor};`}></div>
					</button>
				{/each}
			</div>
		{/each}
		<p class="keyboard-tips">You can pain with the arrow keys and the space bar</p>
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
		padding: 20px 0;
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
		width: 10px;
		height: 10px;
		border: 1px solid #ccc;
		transition: background-color 200ms;
	}

	.cell.focused {
		border: 1px solid #000;
	}

	p.keyboard-tips {
		margin-left: auto;
		font-size: 0.8em;
		opacity: 0.5;
		font-style: italic;
	}
</style>
