<script>
	export let words;
	export let heading;
	let chunks = [];

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

{#if heading}
	<h4 class={classProp}>{heading}</h4>
{/if}

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
		font-variation-settings: 'opsz' 30;
		line-height: 1.4;
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

	h4 {
		font-weight: 400;
		font-size: 0.9em;
		margin-top: 3em;
		color: var(--text-color);
	}
</style>
