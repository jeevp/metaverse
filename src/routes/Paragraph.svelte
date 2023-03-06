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

	// extractCitations(words);
	export let classProp = 'start2 end7';
	export let leadIn = 0;
	export let dropcap;

	const nthMatchIndex = (s, n) => {
		let match;
		let i = 0;
		const re = new RegExp('[\\w\\.]+' + '(?:[\\s-]*[\\w\\.]+){0,' + (n - 1) + '}', 'g');
		while ((match = re.exec(s)) != null && i < n) {
			i = match.index;
		}
		return i;
	};

	const leadInWords = words.slice(0, nthMatchIndex(words, leadIn));
	const restOfWords = words.slice(nthMatchIndex(words, leadIn));
</script>

<!-- <p class={classProp}>
	{#each chunks as chunk, i}
		{#if chunk.type == 'cite'}
			<Cite source={chunk.source} />
		{:else if chunk.type == 'copy'}
			{@html chunk.content}
		{/if}
	{/each}
</p> -->

<p class={classProp} class:dropcap>
	{#if leadIn > 0}
		<strong>{leadInWords}</strong>
		{@html restOfWords}
	{:else}
		{@html words}
	{/if}
</p>

<style>
	p {
		background-color: var(--bg-color);
		color: var(--text-color);
		height: fit-content;
		width: calc(100% - calc(var(--gutter) * 3));
		margin: 0.7em 0;
		font-family: var(--serif-font);
	}

	strong {
		font-family: var(--sans-font);
		text-transform: uppercase;
		font-weight: 500;
		margin-right: -7px;
		font-size: 1em;
		font-family: 'league mono narrow';
		letter-spacing: 0.1em;
	}
	/* 
	.dropcap::first-letter {
		font-size: 300%;
		float: left;
		margin-right: 8px;
		margin-top: 4px;
		line-height: 1;
		font-weight: 100;
		display: block;
		font-family: 'league mono wide';
	} */
</style>
