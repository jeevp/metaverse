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
	import { fade } from 'svelte/transition';
	let showChart = false;
	const toggleChart = () => {
		showChart = true;
	};
</script>

<!-- <SvgFilters /> -->

<section class="grid-wrapper page" id="intro">
	<PageIntro />
	<SectionHeading hook={copy.introHook} byline={copy.introByline} />
	<div id="intro" class="full-width grid-wrapper">
		<Paragraph words={copy.intro1} leadIn={2} dropcap />

		<Etymology on:leave={toggleChart} />

		{#if showChart}
			<div
				in:fade={{ duration: 300, delay: 200 }}
				class="start8 end12"
				style="height: 0; overflow: visible;"
			>
				<TrendsChart />
			</div>
		{/if}
		<Paragraph words={copy.intro2} classProp="start2 end7" heading="Defining the metaverse" />

		<ul class="start2 end7">
			{#each copy.keyCharacteristics as c, i}
				<li><strong>{c.name}</strong> — {c.description}</li>
			{/each}
		</ul>
		<Paragraph words={copy.intro3} classProp="start2 end7" />
		<Paragraph words={copy.intro4} classProp="start2 end7" />
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

	#history {
		margin: 4em 0;
	}

	#tech {
		background-color: var(--dark);
		--bg-color: var(--dark);
		--text-color: var(--light);
	}
</style>
