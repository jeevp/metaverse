<script>
	import PartHeading from '../PartHeading.svelte';
	import SectionHeading from '../SectionHeading.svelte';
	import copy from '../../../data/copy.json';
	import Paragraph from '../Paragraph.svelte';
	import PageIntro from '../PageIntro.svelte';
	// import Cave from './Cave.svelte';
	import Phases from './Phases.svelte';
	import SvgFilters from '../../SVGFilters.svelte';
	import BigTitle from '../BigTitle.svelte';
	import Figure from '../Figure.svelte';
</script>

<PageIntro bg="bold-purple">
	<BigTitle section="reality" />
</PageIntro>
<section class="grid-wrapper page">
	<SvgFilters />
	<PartHeading number="2" title="Reality" />
	<SectionHeading hook={copy.realityHook} byline={copy.realityByline} />

	<Paragraph words={copy.realityIntro} classProp="start3 end9" />
	<Paragraph words={copy.allegory} classProp="start3 end9" heading="Plato’s Allegory of the Cave" />
	<div class="start9 end12">
		<Figure
			source="./plato-cave.png"
			alt="A drawing of Plato's allegory of the cave showing the sun casting shadows on the cave wall"
			caption="An illustration of Plato's cave by Markus Maurer"
			overflow
		/>
	</div>
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
	<Paragraph words={copy.imagePhasesConclusion} classProp="start2 end7" />

	<div class="start7 end12">
		<Figure
			source="./hyper-reality.png"
			caption={`A still from Keiichi Matsuda's concept film "HYPER-REALITY," \
			which depicts a protagonist narrating a futuristic version of Medellín \
			saturated with AR-based advertisements and media.`}
			alt={`A still from Keiichi Matsuda's concept film "HYPER-REALITY" depicting advertisements and popups overlayed using AR`}
			overflow
		/>
	</div>
	<Paragraph words={copy.hyperrealityDangers} classProp="start2 end7" />
	<!-- <Cave /> -->
</section>

<style>
	section {
		--bg-color: var(--pale-purple);
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
