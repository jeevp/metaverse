<script>
	import PartHeading from '../PartHeading.svelte';
	import SectionHeading from '../SectionHeading.svelte';
	import copy from '../../../data/copy.json';
	import Paragraph from '../Paragraph.svelte';
	import PlatCapDiagram from './PlatCapDiagram.svelte';
	import Quote from '../Quote.svelte';
	import PageIntro from '../PageIntro.svelte';
	import BigTitle from '../BigTitle.svelte';
	import Figure from '../Figure.svelte';
</script>

<PageIntro bg="bold-green">
	<BigTitle section="capitalism" />
</PageIntro>
<section class="grid-wrapper page">
	<PartHeading number="3" title="Capitalism" />
	<SectionHeading hook={copy.capitalismHook} byline={copy.capitalismByline} />

	<Paragraph
		words={copy.capitalismIntro}
		classProp="start4 end10"
		heading={`The "reality privilege" argument`}
	/>

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

	<Paragraph
		words={copy.platformCapIntro}
		classProp="start4 end10"
		heading="The platform capitalism model"
	/>
	<div class="start3 end11">
		<PlatCapDiagram />
	</div>
	<Paragraph words={copy.platformCapMeta} classProp="start4 end10" />
	<div class="start2 end7" style="padding: 1em 0">
		<Figure
			source="./eye-tracking2.png"
			alt="Diagram showing augmented reality glasses from a Meta patent"
			caption="Meta patent for wearable AR glasses with biometric sensors"
		/>
	</div>
	<div class="start7 end12" style="padding: 1em 0">
		<Figure
			source="./eye-tracking.png"
			alt="Diagram showing details of an eye-tracking camera from a Meta patent"
			caption="Detail of eye-tracking camera technology from the patent"
		/>
	</div>

	<Paragraph
		words={copy.surveillanceCap}
		classProp="start4 end10"
		heading="Data extraction for surveillance capitalism"
	/>
</section>

<style>
	section {
		--bg-color: var(--pale-green);
		background-color: var(--bg-color);
		--text-color: var(--dark);
		color: var(--text-color);
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
