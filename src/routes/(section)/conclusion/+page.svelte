<script>
	import copy from '../../../data/copy.json';
	import Paragraph from '../Paragraph.svelte';
</script>

<section class="grid-wrapper page">
	<h1 class="start3 end10">Conclusion</h1>
	<Paragraph words={copy.conclusion1} classProp="start3 end9" />
	<Paragraph words={copy.conclusion2} classProp="start3 end9" />
	<Paragraph words={copy.conclusion3} classProp="start3 end9" />
	<Paragraph words={copy.conclusion4} classProp="start3 end9" />
	<Paragraph words={copy.conclusion5} classProp="start3 end9" />
</section>

<style>
	.page {
		margin-top: 200px;
	}

	h1 {
		margin-bottom: 2em;
	}
</style>
