<script>
	import SvgFilters from '../../SVGFilters.svelte';

	import PartHeading from '../PartHeading.svelte';
	import Paragraph from '../Paragraph.svelte';
	import PageIntro from '../PageIntro.svelte';
	import Hardware from './Hardware.svelte';
	import SectionHeading from '../SectionHeading.svelte';
	import TrendsChart from './TrendsChart.svelte';
	import Etymology from './Etymology.svelte';
	import copy from '../../../data/copy.json';
	import Software from './Software.svelte';
	import Timeline from './Timeline.svelte';
</script>

<!-- <SvgFilters /> -->

<section class="grid-wrapper page" id="intro">
	<PageIntro />
	<PartHeading number="1" title="Introduction" />
	<SectionHeading hook={copy.introHook} byline={copy.introByline} />
	<div id="intro" class="full-width grid-wrapper">
		<Paragraph words={copy.intro1} leadIn={2} dropcap />

		<div class="start8 end12">
			<TrendsChart />
		</div>

		<Etymology />
		<Paragraph words={copy.intro2} classProp="start4 end10" heading="Defining the metaverse" />

		<ul class="start4 end10">
			{#each copy.keyCharacteristics as c, i}
				<li><strong>{c.name}</strong> — {c.description}</li>
			{/each}
		</ul>
		<Paragraph words={copy.intro3} classProp="start4 end10" />
		<Paragraph words={copy.intro4} classProp="start4 end10" />
	</div>

	<div id="history" class="full-width grid-wrapper">
		<Timeline data={copy.timelineData} />
	</div>

	<div id="tech" class="full-width grid-wrapper">
		<Hardware />
		<Software />
	</div>
</section>

<!-- 
<div class="start3 end9">
	<Figure
		source="https://parametric.press/issue-02/sinking-delta/static/images/88_fhd.jpg"
		alt="Trulli"
		caption="Fig.1 - Trulli, Puglia, Italy."
	/>
</div> -->

<!-- <SampleScrolly /> -->
<style>
	#intro ul {
		padding: 1em;
	}

	#intro ul li {
		margin-bottom: 1em;
		font-size: 1.1rem;
		list-style: circle;
	}

	#tech {
		background-color: var(--dark);
		--bg-color: var(--dark);
		--text-color: var(--light);
	}
</style>
