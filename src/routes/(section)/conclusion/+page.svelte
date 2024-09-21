<script>
	import copy from '../../../data/copy.json';
	import Paragraph from '../Paragraph.svelte';
	import { fade } from 'svelte/transition';
	import Figure from '../Figure.svelte';
</script>

<section class="grid-wrapper page">
	<h1 class="start3 end10">Conclusion</h1>
	<Paragraph words={copy.conclusion1} classProp="start3 end9" />
	<Paragraph words={copy.conclusion2} classProp="start3 end9" />
	<Paragraph words={copy.conclusion3} classProp="start3 end9" />
	{#if true}
		<div class="start2 end7 search-results" in:fade|global={{ duration: 300, delay: 1200 }}>
			<Figure
				source="./search-results1.png"
				alt="Google search results for the term 'metaverse' on May 12, 2022"
				caption="Google search results for the term 'metaverse' on May 12, 2022"
			/>
		</div>
		<div class="start7 end12 search-results" in:fade|global={{ duration: 300, delay: 1200 }}>
			<Figure
				source="./search-results2.png"
				alt="Google search results for the term 'metaverse' on May 15, 2023"
				caption="Google search results for the term 'metaverse' on May 15, 2023"
			/>
		</div>
	{/if}
	<Paragraph words={copy.conclusion4} classProp="start3 end9" />
	<Paragraph words={copy.conclusion5} classProp="start3 end9" />
</section>

<style>
	.page {
		margin-top: 200px;
	}

	h1 {
		margin-bottom: 2em;
	}

	.search-results {
		margin: 3em 0;
	}
</style>
