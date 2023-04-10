<script>
	import PartHeading from './PartHeading.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import copy from '../data/copy.json';
	import Paragraph from './Paragraph.svelte';
	import Cave from './Cave.svelte';
	import PlatCapDiagram from './PlatCapDiagram.svelte';
	import SvgFilters from './SVGFilters.svelte';
	import Quote from './Quote.svelte';
</script>

<section class="grid-wrapper">
	<PartHeading number="6" title="Capitalism" />
	<SectionHeading hook={copy.capitalismHook} byline={copy.capitalismByline} />

	<Paragraph words={copy.capitalismIntro} classProp="start4 end10" />

	<div class="start3 end10">
		<Quote
			author="Marc Andreessen"
			tagline="Investor, entrepreneur, and Meta board member"
			words={copy.andreessenQuote}
			big={false}
		/>
	</div>

	<Paragraph words={copy.realityPrivilege} classProp="start4 end10" />

	<div class="start3 end10">
		<Quote
			author="John Carmack"
			tagline="VR pioneer and former Meta consultant CTO"
			words={copy.carmackQuote}
			big={false}
		/>
	</div>
	<Paragraph words={copy.carmackAnalysis} classProp="start4 end10" />

	<Paragraph words={copy.platformCapIntro} classProp="start4 end10" />
	<div class="start3 end11">
		<PlatCapDiagram />
	</div>
	<Paragraph words={copy.platformCapMeta} classProp="start4 end10" />
	<Paragraph words={copy.surveillanceCap} classProp="start4 end10" />
</section>

<style>
	section {
		--bg-color: #ebf4f7;
		--text-color: var(--dark);
		background-color: var(--bg-color);
		color: var(--text-color);
		padding-bottom: 200px;
	}

	.phases {
		margin: 1.5em 0;
	}

	ol {
		background-color: var(--bg-color);
		color: var(--text-color);
	}

	h4 {
		font-size: 1.2rem;
	}

	li {
		margin-bottom: 1.2em;
		padding-left: 1em;
	}

	li::marker {
		content: 'Phase ' counter(list-item) '';
		font-size: 0.9rem;
		font-weight: 600;
	}

	li .desc {
		font-size: 1.1rem;
		display: block;
		margin-bottom: 0.3em;
		font-style: italic;
	}

	li .example {
		font-size: 1.1rem;
		font-family: var(--serif-font);
	}
</style>
