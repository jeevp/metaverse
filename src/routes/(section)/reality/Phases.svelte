<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap/dist/gsap.js';
	import { imagePhases } from '../../../data/copy.json';

	onMount(() => {
		console.log('just navigated');
		let sections = gsap.utils.toArray('.panel');

		gsap.to(sections, {
			xPercent: -100 * (sections.length - 0.7),
			ease: 'none',
			scrollTrigger: {
				trigger: '#phases-container',
				pin: true,
				// markers: true,
				scrub: 1,
				start: '-40',
				// snap: 1 / (sections.length - 1),
				end: '+=4000'
			}
		});
	});
</script>

<div class="full-width grid-wrapper" id="phases-container">
	<div class="intro start3 end12">
		<h3 class="start3 end12">Baudrillard's four phases of the image:</h3>
	</div>
	<div class="panels full-width">
		{#each imagePhases as phase, i}
			<div class="panel">
				<span class="phase-num">Phase {i + 1}</span>
				<img
					src={`./phases/phase${i + 1}.png`}
					alt={`An illustration depicting phase ${i} of the image (${phase.name}).`}
				/>
				<div class="details">
					<h4>{phase.name}</h4>
					<span class="desc">{phase.description}</span>
					<p class="example">{phase.example}</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	#phases-container {
		overscroll-behavior: none;
		overflow: visible;
		height: fit-content;
		margin-bottom: 150px;
	}

	.panels {
		display: flex;
		flex-wrap: nowrap;
	}

	.intro {
		padding: 3em 0;
	}

	.panel {
		padding: 2em 3em;
		padding-top: 3em;
		margin: 0 3em;
		display: flex;
		/* background-color: #eaeff1; */
		background: #ffffff9f;
		border-radius: 10px;
		height: auto;
		max-width: fit-content;
	}

	.panel img {
		max-width: 500px;
		align-self: flex-start;
	}

	.details {
		margin-left: 2em;
		max-width: 400px;
	}

	.phase-num {
		display: block;
		font-family: 'League Mono Narrow';
		margin-bottom: 2em;
		font-size: 0.9em;
		text-transform: uppercase;
		position: absolute;
		top: -10px;
		left: -10px;
		background-color: white;
		padding: 0.4em 0.6em;
		border-radius: 10px;
		border: 1px solid var(--dark);
	}

	.details .desc {
		display: block;
		margin-bottom: 0.3em;
		font-style: italic;
		font-size: 1.2rem;
		font-family: var(--serif-font);
		min-width: 400px;
	}

	.details .example {
		font-size: 1.2rem;
		margin-top: 1.3em;
		font-family: var(--serif-font);
	}
</style>
