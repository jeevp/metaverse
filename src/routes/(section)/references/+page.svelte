<section class="grid-wrapper">
	<div class="full-width">
		<h3>References by essay section</h3>
	</div>
</section>

<style>
	section {
		--bg-color: #f7f4e9;
		--text-color: var(--dark);
		background-color: var(--bg-color);
		color: var(--text-color);
		padding-top: 4em;
	}

	.phases {
		margin: 1.5em 0;
	}

	ol {
		background-color: var(--bg-color);
		color: var(--text-color);
	}

	li {
		margin-bottom: 1.2em;
		padding-left: 1em;
	}

	li::marker {
		content: 'Phase ' counter(list-item) '';
		font-size: 0.9rem;
		font-weight: 600;
	}

	li .desc {
		font-size: 1.1rem;
		display: block;
		margin-bottom: 0.3em;
		font-style: italic;
	}

	li .example {
		font-size: 1.1rem;
		font-family: var(--serif-font);
	}
</style>
