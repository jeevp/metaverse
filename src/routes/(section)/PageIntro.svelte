<script>
	export let bg;
</script>

<div class="page-intro full-width" style={`background-color: var(--${bg})`}>
	<div class="content">
		<slot />
	</div>
</div>

<style>
	.page-intro {
		position: fixed;
		height: 40vh;
		width: calc(100% - var(--gutter));
		left: calc(var(--gutter) / 2);
		display: flex;
		padding: 0;
		z-index: -1;
		top: 1em;
	}
	.page-intro .content {
		margin: auto;
		width: fit-content;
		height: fit-content;
	}
</style>
