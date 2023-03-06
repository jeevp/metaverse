<script>
	import copy from '../data/copy.json';
	import Paragraph from './Paragraph.svelte';
	import Quote from './Quote.svelte';
	import SampleScrolly from './SampleScrolly.svelte';
	import Figure from './Figure.svelte';
	import Timeline from './Timeline.svelte';
	import SvgFilters from './SVGFilters.svelte';
	import TrendsChart from './TrendsChart.svelte';
	import Etymology from './Etymology.svelte';
	import PartHeading from './PartHeading.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import TechSection from './TechSection.svelte';
	import IdentitySection from './IdentitySection.svelte';
</script>

<!-- <SvgFilters /> -->
<!-- 
<h2 class="start2 end6">Hyperreality and techno-feudalism</h2>
<h4 class="start2 end8">{copy.testHeadline}</h4>

<Quote data={copy.realityPrivilegeQuote} /> -->

<IdentitySection />
<TechSection />

<div class="grid-wrapper">
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
</div>

<div class="grid-wrapper">
	<PartHeading number="2" title="History" />
	<SectionHeading hook={copy.historyHook} byline={copy.historyByline} />

	<Timeline data={copy.timelineData} />
</div>

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
	ul {
		padding: 1em;
		margin-bottom: 3em;
	}

	ul li {
		margin-bottom: 1em;
		font-size: 1.1rem;
		list-style: circle;
	}
</style>
