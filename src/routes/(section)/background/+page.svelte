<script>
	import Paragraph from '../Paragraph.svelte';
	import PageIntro from '../PageIntro.svelte';
	import SectionHeading from '../SectionHeading.svelte';
	import TrendsChart from './TrendsChart.svelte';
	import Etymology from './Etymology.svelte';
	import copy from '../../../data/copy.json';
	import Timeline from './Timeline.svelte';
	import { fade } from 'svelte/transition';
	import Figure from '../Figure.svelte';
	import ImmersiveTech from './ImmersiveTech.svelte';
	import EconomyDemo from './EconomyDemo.svelte';

	let showChart = false;
	const toggleChart = () => {
		showChart = true;
	};
</script>

<!-- <SvgFilters /> -->

<PageIntro />
<section class="grid-wrapper page" style="padding-bottom: 0; margin-top: 20vh">
	<SectionHeading hook={copy.introHook} byline={copy.introByline} />
	{#if true}
		<div class="start7 end12" in:fade={{ duration: 300, delay: 1200 }} style="padding-left: 2em">
			<Figure source="./headset.png" alt="Illustration of a person wearing a headset" overflow />
		</div>
	{/if}
	<div id="intro" class="full-width grid-wrapper">
		<Paragraph words={copy.intro1} leadIn={2} dropcap />
		<Etymology on:leave={toggleChart} />

		{#if showChart}
			<div
				in:fade={{ duration: 300, delay: 200 }}
				class="start7 end12"
				style="height: 0; overflow: visible; padding: 0 2em"
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

		{#if showChart}
			<div
				class="start7 end12"
				style="margin-top: 60px; padding: 2em 1em"
				in:fade={{ duration: 300, delay: 1200 }}
			>
				<Figure
					source="./meta-screenshots.png"
					alt="Collage of screenshots from Meta's announcement video about the metaverse"
					caption={`Images from Meta's video announcing the company's vision for the metaverse. \
						Renderings show applications of the metaverse for work, education, and entertainment.`}
					overflow
				/>
			</div>
		{/if}
		<Paragraph words={copy.intro3} classProp="start2 end7" />
		<Paragraph words={copy.intro4} classProp="start2 end7" />
	</div>

	<div id="history" class="full-width grid-wrapper">
		<Paragraph
			words={copy.timelineIntro1}
			classProp="start2 end7"
			heading="Timeline of the metaverse"
		/>
		<Paragraph words={copy.timelineIntro2} classProp="start7 end12" />
		<Timeline data={copy.timelineData} />
	</div>

	<div id="tech" class="full-width grid-wrapper">
		<Paragraph words={copy.techIntro} heading="Technology of the metaverse" />
		<h4 class="start2 end12">Technologies for immersive virtual experiences</h4>
		<p class="start2 end7">{copy.immersiveTechIntro}</p>
		<div class="start7 end12" style="padding-left: 40px">
			<Figure
				source="./virtuality.svg"
				alt="Diagram showing where virtual, augmented, and mixed reality fall on the spectrum from the physical world to the virtual one"
			/>
		</div>
		<ImmersiveTech />

		<h4 class="start2 end12">Technologies for decentralized virtual economies</h4>
		<p class="start2 end7">{copy.economyTechIntro}</p>
		<div class="start7 end12" style="padding-left: 40px">
			<Figure
				source="./economy.svg"
				alt="Diagram showing how blockchain, NFTs, and cryptocurrency work together to support virtual economies"
			/>
		</div>
		<EconomyDemo />
	</div>
</section>

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
		/* background-color: var(--dark);
		--bg-color: var(--dark);
		--text-color: var(--light); */
		--bg-color: #fcf3cf;
		background-color: var(--bg-color);
		background: var(--bg-color);
		padding-bottom: 100px;
	}

	#history {
		padding-bottom: 100px;
		background-color: white;
		--bg-color: white;
		margin-top: 100px;
	}

	p {
		font-size: 1.07rem;
		font-family: var(--sans-font);
	}

	h4 {
		font-weight: 500;
		border-bottom: 2px dotted black;
		font-family: 'league mono narrow';
		margin-top: 4em;
		margin-bottom: 1em;
		font-size: 1.2rem;
	}
</style>
