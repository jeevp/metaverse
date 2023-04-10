<script>
	import Error from './Error.svelte';
	export let words, author, tagline, big;
</script>

{#if words && author && tagline}
	<div class="quote" class:big>
		<blockquote>
			{words}
		</blockquote>
		<span class="author">{author}</span>
		<span class="tagline">{tagline}</span>
	</div>
{:else}
	<Error />
{/if}

<style>
	.quote {
		padding: calc(var(--gutter) * 2) calc(var(--gutter) * 3);
		background-color: rgba(0, 0, 0, 0.027);
		font-size: 1rem;
		margin: 1em;
	}

	blockquote {
		font-size: 1.2rem;
	}

	blockquote.big {
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
