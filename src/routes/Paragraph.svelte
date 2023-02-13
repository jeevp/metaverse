<script>
	import Cite from './Cite.svelte';

	export let words;
	let chunks = [];

	const extractCitations = (str) => {
		let pattern = /<cite:(.*?)>/g;
		let start = 0;
		let end = str.length - 1;

		const arr = [...str.matchAll(pattern)];

		if (arr.length == 0) {
			chunks.push({
				type: 'copy',
				content: str
			});
		}

		arr.forEach((match, i) => {
			chunks.push({
				type: 'copy',
				content: str.slice(start, match.index)
			});
			start = match.index;
			end = start + match[0].length;
			// push string in angle brackets:
			let citation = str.slice(start + 1, end - 1);
			chunks.push({
				type: 'cite',
				content: citation,
				source: citation.split(':')[1]
			});
			start = end;
			if (i == arr.length - 1) {
				chunks.push({
					type: 'copy',
					content: str.slice(start, str.length)
				});
			}
		});
	};

	extractCitations(words);
	export let classProp = 'start2 end7';
</script>

<p class={classProp}>
	{#each chunks as chunk, i}
		{#if chunk.type == 'cite'}
			<Cite source={chunk.source} />
		{:else if chunk.type == 'copy'}
			{@html chunk.content}
		{/if}
	{/each}
</p>

<style>
	p {
		background-color: var(--light);
		height: fit-content;
		/* width: calc(100% - var(--gutter)); */
		margin: 0.7em auto;
		font-family: var(--serif-font);
	}
</style>
