<script>
	import SampleScrolly from './SampleScrolly.svelte';
	import PartHeading from './PartHeading.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import Software from './Software.svelte';
	import Hardware from './Hardware.svelte';

	import copy from '../data/copy.json';
</script>

<section class="grid-wrapper">
	<PartHeading number="3" title="Technology" />

	<SectionHeading hook={copy.techHook} byline={copy.techByline} />
	<Hardware />
	<Software />
</section>

<style>
	section {
		background-color: var(--dark);
		--bg-color: var(--dark);
		--text-color: var(--light);
	}
</style>
