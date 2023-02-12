<script>
	import copy from '../data/copy.json';
	import Paragraph from './Paragraph.svelte';
	import Quote from './Quote.svelte';
	import Scrolly from './Scrolly.svelte';
	import Figure from './Figure.svelte';
	let scrollIndex;
</script>

<div class="fixed ">
	<div>
		<h1>scrollIndex: {scrollIndex}</h1>
		<Figure
			source="https://parametric.press/issue-02/sinking-delta/static/images/88_fhd.jpg"
			alt="Trulli"
			caption="Fig.1 - Trulli, Puglia, Italy."
		/>
	</div>
</div>
<div class="scrolly-container">
	<Scrolly bind:value={scrollIndex}>
		<Paragraph words={copy.intro} />
		<Paragraph words={copy.intro} />
		<div style="margin: 200px 0">
			<Quote data={copy.realityPrivilegeQuote} />
		</div>

		<Paragraph words={copy.intro} />
		<Paragraph words={copy.intro} />
	</Scrolly>
</div>

<style>
	.scrolly-container {
		grid-column: 7 / -2;
	}

	.fixed {
		grid-column: 2 / 6;
	}

	.fixed > div {
		position: sticky;
		top: 10em;
	}

	h1 {
		position: sticky;
		top: 0;
	}
</style>
