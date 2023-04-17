<script>
	import PartHeading from '../PartHeading.svelte';
	import SectionHeading from '../SectionHeading.svelte';
	import copy from '../../../data/copy.json';
	import Paragraph from '../Paragraph.svelte';
	import PageIntro from '../PageIntro.svelte';
	// import Cave from './Cave.svelte';
	import Phases from './Phases.svelte';
	import SvgFilters from '../../SVGFilters.svelte';
</script>

<section class="grid-wrapper page">
	<PageIntro />

	<SvgFilters />
	<PartHeading number="5" title="Reality" />
	<SectionHeading hook={copy.realityHook} byline={copy.realityByline} />

	<Paragraph words={copy.realityIntro} classProp="start3 end9" />
	<Paragraph words={copy.allegory} classProp="start3 end9" heading="Plato’s Allegory of the Cave" />
	<Paragraph words={copy.allegoryExplanation} classProp="start3 end9" />
	<Paragraph
		words={copy.hyperreality}
		classProp="start3 end9"
		heading="Baudrillard’s theory of hyperreality"
	/>

	<Phases />

	<!-- <div class="start3 end8 phases">
		<ol>
			{#each copy.imagePhases as phase}
				<li>
					<h4>{phase.name}</h4>
					<span class="desc">{phase.description}</span>
					<p class="example">{phase.example}</p>
				</li>
			{/each}
		</ol>
	</div> -->
	<Paragraph words={copy.imagePhasesConclusion} classProp="start3 end9" />
	<Paragraph words={copy.hyperrealityDangers} classProp="start3 end9" />
	<!-- <Cave /> -->
</section>

<style>
	section {
		--bg-color: #f7f4e9;
		--text-color: var(--dark);
		background-color: var(--bg-color);
		color: var(--text-color);
	}

	.phases {
		margin: 1.5em 0;
	}

	ol {
		background-color: var(--bg-color);
		color: var(--text-color);
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
