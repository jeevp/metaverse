<script>
	import Etymology from './Etymology.svelte';
	import PartHeading from './PartHeading.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import copy from '../data/copy.json';
	import TrendsChart from './TrendsChart.svelte';
	import Paragraph from './Paragraph.svelte';
</script>

<section class="grid-wrapper">
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
