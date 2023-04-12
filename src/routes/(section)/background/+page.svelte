<script>
	import SvgFilters from '../../SVGFilters.svelte';

	import PartHeading from '../PartHeading.svelte';
	import Paragraph from '../Paragraph.svelte';
	import Hardware from './Hardware.svelte';
	import SectionHeading from '../SectionHeading.svelte';
	import TrendsChart from './TrendsChart.svelte';
	import Etymology from './Etymology.svelte';
	import copy from '../../../data/copy.json';
	import Software from './Software.svelte';
	import Timeline from './Timeline.svelte';
</script>

<!-- <SvgFilters /> -->

<section class="grid-wrapper" id="intro">
	<PartHeading number="1" title="Introduction" />
	<SectionHeading hook={copy.introHook} byline={copy.introByline} />
	<Paragraph words={copy.intro1} leadIn={2} dropcap />

	<div class="start8 end12">
		<TrendsChart />
	</div>

	<Etymology />
	<Paragraph words={copy.intro2} classProp="start5 end11" />

	<ul class="start5 end11">
		{#each copy.keyCharacteristics as c, i}
			<li><strong>{c.name}</strong> — {c.description}</li>
		{/each}
	</ul>
	<Paragraph words={copy.intro3} classProp="start4 end10" />
	<Paragraph words={copy.intro4} classProp="start4 end10" />
</section>

<section class="grid-wrapper" id="history">
	<PartHeading number="2" title="History" />
	<SectionHeading hook={copy.historyHook} byline={copy.historyByline} />

	<Timeline data={copy.timelineData} />
</section>

<section class="grid-wrapper" id="tech">
	<PartHeading number="3" title="Technology" />

	<SectionHeading hook={copy.techHook} byline={copy.techByline} />
	<Hardware />
	<Software />
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
		margin-bottom: 3em;
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
