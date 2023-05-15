<script>
	export let hook;
	export let byline;
</script>

<div class="start2 end7">
	<h3 class="hook">
		{hook}
	</h3>

	<h3 class="byline">
		{byline}
	</h3>
</div>

<style>
	h3 {
		line-height: 120%;
		font-variation-settings: 'opsz' 40;
	}
	.hook {
		font-family: var(--sans-font);
		font-weight: 600;
		font-size: 1.8em;
		margin-bottom: 0.2em;
	}
	.byline {
		font-family: var(--serif-font);
		font-weight: 400;
		font-size: 1.7em;
	}
	div {
		margin: 1em 0;
		margin-bottom: 4em;
		color: var(--text-color);
	}
</style>
