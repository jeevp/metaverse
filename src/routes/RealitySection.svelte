<script>
	import PartHeading from './PartHeading.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import copy from '../data/copy.json';
	import Paragraph from './Paragraph.svelte';
	import Cave from './Cave.svelte';
</script>

<section class="grid-wrapper">
	<PartHeading number="5" title="Reality" />

	<SectionHeading hook={copy.realityHook} byline={copy.realityByline} />
	<Paragraph words={copy.realityIntro} classProp="start3 end9" />
	<Paragraph words={copy.allegory} classProp="start3 end9" />
	<Paragraph words={copy.allegoryExplanation} classProp="start3 end9" />
	<Paragraph words={copy.hyperreality} classProp="start3 end9" />
	<div class="start3 end8 phases">
		<!-- <h3>Baudrillard's Phases of the image</h3> -->
		<ol>
			{#each copy.imagePhases as phase}
				<li>
					<h4>{phase.name}</h4>
					<span class="desc">{phase.description}</span>
					<p class="example">{phase.example}</p>
				</li>
			{/each}
		</ol>
	</div>
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

	h4 {
		font-size: 1.2rem;
	}

	li {
		margin-bottom: 1.2em;
		padding-left: 1em;
	}

	li::marker {
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
