<script>
	import copy from '../data/copy.json';
	import BlockchainDemo from './BlockchainDemo.svelte';
	import Paragraph from './Paragraph.svelte';
	import Quote from './Quote.svelte';
	import SampleScrolly from './SampleScrolly.svelte';
	import Figure from './Figure.svelte';
	import Timeline from './Timeline.svelte';
	import SvgFilters from './SVGFilters.svelte';
	import TrendsChart from './TrendsChart.svelte';
</script>

<SvgFilters />

<h2 class="start2 end6">Hyperreality and techno-feudalism</h2>
<h4 class="start2 end8">{copy.testHeadline}</h4>

<Quote data={copy.realityPrivilegeQuote} />

<div class="start2 end7">
	<TrendsChart />
</div>

<div class="start3 end9">
	<Figure
		source="https://parametric.press/issue-02/sinking-delta/static/images/88_fhd.jpg"
		alt="Trulli"
		caption="Fig.1 - Trulli, Puglia, Italy."
	/>
</div>

<Timeline />

<Paragraph words={copy.intro} />

<SampleScrolly />
<BlockchainDemo />

<style>
	h2 {
		font-size: 3em;
		font-family: var(--accent-font);
		font-weight: 400;
		margin: 0;
		margin-top: 1em;
		line-height: 1.2;
		/* font-feature-settings: 'ss02'; */
	}

	h4 {
		font-size: 1.3em;
		font-weight: 400;
		margin: 2em 0;
	}
</style>
