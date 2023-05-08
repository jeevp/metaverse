<script>
	import { immersiveTechnologies } from '../../../data/copy.json';
	import Scrolly from './Scrolly.svelte';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	let scrollIndex;
	let videos;

	console.log('videos');
	console.log(videos);

	onMount(() => {
		videos = immersiveTechnologies;
		console.log(videos);
	});
</script>

<div class="scrolly-container start2 end7" id="container">
	<Scrolly bind:value={scrollIndex}>
		<div class="device">
			<h4>Augmented Reality (AR)</h4>
			<p>
				{immersiveTechnologies[0].description}
			</p>
		</div>
		<div class="device">
			<h4>Virtual reality (VR)</h4>
			<p>
				{immersiveTechnologies[1].description}
			</p>
		</div>
		<div class="device">
			<h4>Mixed reality (MR)</h4>
			<p>
				{immersiveTechnologies[2].description}
			</p>
		</div>
	</Scrolly>
</div>
<div class="fixed start7 end12">
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

<style>
	#container {
		/* background-color: #dce4e1; */
		margin-top: 10vh;
		--text-color: var(--dark);
		color: var(--text-color);
		border-radius: 0.5em;
		font-size: 1.1rem;
		padding-left: 2em;
	}

	.fixed {
		padding-left: 70px;
	}

	.fixed > div {
		position: sticky;
		top: 10vh;
		/* background-color: #e8ebea; */
		height: 90vh;
		padding: 2em 0;
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
		list-style: square;
	}

	.caption span {
		display: block;
	}

	.device {
		margin-bottom: 6em;
	}
</style>
