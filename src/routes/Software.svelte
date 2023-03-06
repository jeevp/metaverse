<script>
	import copy from '../data/copy.json';
	import BlockchainDemo from './BlockchainDemo.svelte';
</script>

<div class="full-width" id="container">
	<h3>Software</h3>
	<p class="intro">
		{copy.softwareIntro}
	</p>

	<BlockchainDemo />
</div>

<style>
	#container {
		background-color: #dce4e1;
		margin: calc(var(--gutter) * 2);
		padding: 2em;
		--text-color: var(--dark);
		color: var(--text-color);
		border-radius: 0.5em;
	}

	h3 {
		font-size: 1.4em;
		margin-bottom: 0.7em;
	}

	p.intro {
		width: 40%;
		padding-bottom: 3em;
	}

	.term-row {
		display: flex;
	}
</style>
