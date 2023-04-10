<script>
	import Timeline from './Timeline.svelte';
	import PartHeading from './PartHeading.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import copy from '../data/copy.json';
</script>

<section class="grid-wrapper">
	<PartHeading number="2" title="History" />
	<SectionHeading hook={copy.historyHook} byline={copy.historyByline} />

	<Timeline data={copy.timelineData} />
</section>
