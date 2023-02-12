<script>
	import Error from './Error.svelte';
	export let data;
</script>

{#if data && data.author && data.words && data.tagline}
	<div class="quote">
		<blockquote>
			{data.words}
		</blockquote>
		<span class="author">{data.author}</span>
		<span class="tagline">{data.tagline}</span>
	</div>
{:else}
	<Error />
{/if}

<style>
	* {
		line-height: 1.2;
	}

	.quote {
		grid-column: 8 / -1;
		margin: 1em 0;
	}

	blockquote {
		font-size: 1.6em;
	}

	blockquote::before {
		position: absolute;
		margin-left: -0.5em;
		content: open-quote;
	}

	blockquote::after {
		content: close-quote;
	}

	.author {
		font-weight: 600;
		display: block;
		margin-top: 2em;
	}

	.tagline {
		display: block;
	}
</style>
