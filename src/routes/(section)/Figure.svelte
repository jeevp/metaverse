<script>
	export let source;
	export let alt;
	export let caption;
	export let height;
	export let overflow = false;
</script>

{#if source}
	<figure class:overflow>
		<img src={source} {alt} style={`max-height: ${height}px`} />
		{#if caption}
			<figcaption>{@html caption}</figcaption>
		{/if}
	</figure>
{/if}

<style>
	figure {
		padding: 1em;
	}

	figcaption {
		font-family: var(--sans-font);
		font-size: 0.9rem;
		margin-top: 0.7em;
	}

	figure.overflow {
		max-height: 0;
		overflow: visible;
	}
</style>
