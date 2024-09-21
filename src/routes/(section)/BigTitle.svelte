<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let section;
	$: path = `/videos/${section}_text.mp4`;

	let ready = false;
	onMount(() => {
		ready = true;
	});
</script>

{#key ready}
	<div class="text" in:fade|global={{ duration: 300, delay: 1000 }}>
		<div id="vid-container">
			<video loop autoplay muted>
				<source src={path} type="video/mp4" />
				Your browser does not support the video tag.
			</video>
		</div>
	</div>
{/key}

<style>
	video {
		height: 200px;
		display: flex;
	}

	#vid-container {
		width: fit-content;
		height: fit-content;
		overflow: hidden;
	}
	video {
		position: relative;
		top: 2px;
	}
</style>
