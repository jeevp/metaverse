<script>
	export let source;
	export let alt;
	export let caption;
</script>

{#if source}
	<figure>
		<img src={source} {alt} />
		<figcaption>{caption}</figcaption>
	</figure>
{/if}

<style>
	figure {
		margin-top: 1em;
		margin-bottom: 2em;
	}
	figcaption {
		font-family: var(--ui-font);
		font-size: 0.8em;
		font-weight: 800;
		margin-top: 0.25em;
	}
</style>
