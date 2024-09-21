<script>
	import PartHeading from '../PartHeading.svelte';
	import SectionHeading from '../SectionHeading.svelte';
	import copy from '../../../data/copy.json';
	import Paragraph from '../Paragraph.svelte';
	import PageIntro from '../PageIntro.svelte';
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
</style>
