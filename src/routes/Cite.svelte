<script>
	import copy from '../data/copy.json';
	import Error from './Error.svelte';
	export let source;
	const citationIndex = copy.citations.findIndex((c) => {
		return c.key === source;
	});
	console.log(citationIndex);
	const citation = copy.citations[citationIndex];

	let expanded = false;
	const toggleCitation = () => {
		expanded = !expanded;
		console.log(expanded);
	};
</script>

{#if citation && citationIndex !== -1}
	<button on:click={toggleCitation}>{citationIndex + 1}</button>
	{#if expanded}
		<cite>
			<span style="margin-right: 1em">{citationIndex + 1}</span>
			{@html citation.short}
		</cite>
	{/if}
{:else}
	<Error />
{/if}

<style>
	button {
		background: transparent;
		height: fit-content;
		line-height: 1em;
		padding: 0;
		width: auto;
		border: none;
		/* margin-right: 0.5em; */
		align-items: center;
		justify-content: center;
		display: inline-flex;
		position: relative;
		top: -6px;
		left: -3px;
		margin-right: -3px;
		font-family: var(--ui-font);
		font-size: 0.6em;
		font-weight: 900;
		color: var(--dark);
		opacity: 0.7;
	}

	button:hover {
		opacity: 0.9;
	}

	cite {
		padding: 1em;
		display: block;
		font-family: var(--ui-font);
		font-style: normal;
		font-weight: 500;
		font-size: 0.7em;
		background-color: rgba(0, 0, 0, 0.05);
	}
</style>
