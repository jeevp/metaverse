<script>
	import { hardwareSteps } from '../../../data/copy.json';
	import Scrolly from './Scrolly.svelte';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let scrollIndex;
	let videos;

	console.log('videos');
	console.log(videos);

	onMount(() => {
		videos = hardwareSteps;
		console.log(videos);
	});
</script>

<div class="grid-wrapper full-width" id="container">
	<h3 class="full-width">Hardware</h3>
	<div class="fixed start1 end6">
		{#if scrollIndex >= 0}
			<div>
				{#key scrollIndex}
					<div
						class="fig-container"
						in:fade={{ duration: 400, delay: 600 }}
						out:fade={{ duration: 400, delay: 0 }}
					>
						<video autoplay muted loop>
							<source src={`/videos/${videos[scrollIndex].source}`} type="video/mp4" />
							Your browser does not support the video tag.
							<track kind="captions" />
						</video>
						<div
							class="caption"
							in:fly={{ y: 30, duration: 500, delay: 900 }}
							out:fly={{ y: 30, duration: 500, delay: 0 }}
						>
							<strong>{videos[scrollIndex].name}</strong>
							<span>{videos[scrollIndex].caption}</span>
						</div>
					</div>
				{/key}
			</div>
		{/if}
	</div>
	<div class="scrolly-container start6 end13" id="container">
		<Scrolly bind:value={scrollIndex}>
			<div class="device">
				<h4>Augmented Reality (AR)</h4>
				<p>
					{hardwareSteps[2].description}
				</p>
			</div>
			<div class="device">
				<h4>Virtual reality (VR)</h4>
				<p>
					{hardwareSteps[2].description}
				</p>
			</div>
			<div class="device">
				<h4>Mixed reality (MR)</h4>
				<p>
					{hardwareSteps[2].description}
				</p>
			</div>
		</Scrolly>
	</div>
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

	.fixed > div {
		position: sticky;
		top: 20vh;
		/* background-color: #e8ebea; */
		height: 90vh;
	}

	.fig-container {
		padding: 2em;
	}

	.fig-container > * {
		max-height: 400px;
		/* margin: auto; */
		border-radius: 0.2em;
	}

	.caption {
		background-color: white;
		position: relative;
		top: -2em;
		left: 6em;
		width: 70%;
		padding: 0.4em 0.6em;
		color: var(--dark);
		font-size: 1rem;
	}

	.caption span {
		display: block;
	}

	h3 {
		font-size: 1.4em;
		margin-bottom: 0.7em;
	}

	h1 {
		position: sticky;
		top: 0;
	}

	.device {
		margin-bottom: 200px;
	}
</style>
