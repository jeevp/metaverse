<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="page-container">
	<Header />
	<div class="grid-wrapper">
		<slot />

		<footer>
			<p>visit to learn SvelteKit</p>
		</footer>
	</div>
	<div class="grid-bg">
		{#each { length: 12 } as _, i}
			<div class="grid-line" />
		{/each}
	</div>
</div>

<style>
	.page-container {
		width: calc(100% - var(--gutter));
		margin: 0 auto;
	}

	.grid-wrapper {
		height: 500px;
		display: grid;
		grid-template-columns: repeat(12, minmax(0, 1fr));
		grid-auto-rows: minmax(min-content, max-content);
	}

	.grid-bg {
		display: grid;
		width: calc(100% - var(--gutter));
		height: 1000px;
		position: fixed;
		top: 0;
		left: calc(var(--gutter) / 2);
		z-index: -1;
		grid-template-columns: repeat(6, minmax(0, 1fr));
	}

	.grid-bg::after {
		content: '';
		position: absolute;
		right: 0;
		height: 100%;
		border-right: 2px dotted black;
	}

	.grid-wrapper > * {
		/* border: 1px solid black; */
	}
	.grid-bg > .grid-line {
		/* border-right: 0.5px dashed black;
		border-left: 0.5px dashed black; */
		background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMiIgaGVpZ2h0PSIxNDQ5IiB2aWV3Qm94PSIwIDAgMiAxNDQ5IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMC41IDBMMS41IDE0NDguNSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLWRhc2hhcnJheT0iMSA3Ii8+Cjwvc3ZnPgo=');
		background-repeat: repeat-y;
	}
	.grid-bg > .grid-line:first-child {
		margin-left: 0;
	}
</style>
