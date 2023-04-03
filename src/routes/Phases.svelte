<script>
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import copy from '../data/copy.json';

	gsap.registerPlugin(ScrollTrigger);

	onMount(() => {
		let sections = gsap.utils.toArray('.panel');

		gsap.to(sections, {
			xPercent: -100 * (sections.length - 0.7),
			ease: 'none',
			scrollTrigger: {
				trigger: '.panel-container',
				pin: true,
				markers: true,
				scrub: 1,
				// snap: 1 / (sections.length - 1),
				end: '+=7000'
			}
		});
	});
</script>

<div class="panel-container full-width grid-wrapper">
	<div class="intro start3 end12">
		<h3 class="start3 end12">Baudrillard's four phases of the image:</h3>
		<!-- <p class="start3 end10 tag">
			Donec ultricies nec purus sed hendrerit. Vivamus a nulla ac elit dignissim ornare tempor in
			odio. Aenean sed ultrices eros, ut vulputate nibh. Mauris eu dui convallis, vulputate justo
			sed, viverra ligula. Morbi imperdiet, mauris in venenatis vestibulum, metus lectus tempor
			eros, non dictum nisi sem vel ligula.
		</p> -->
	</div>
	<div class="panels full-width">
		{#each copy.imagePhases as phase, i}
			<div class="panel">
				<span class="phase-num">Phase {i + 1}</span>
				<img src={`./phases/phase${i + 1}.png`} />
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
	.panel-container {
		overscroll-behavior: none;
		overflow: visible;
		height: fit-content;
		margin-bottom: 4em;
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

	body {
		overflow-x: hidden;
		overflow-y: scroll;
	}

	h1,
	h2,
	p,
	li {
		max-width: 800px;
	}

	/* HEADER */
	header {
		position: fixed;
		top: 0px;
		left: 0px;
		padding: 6px 10px 10px 10px;
		border-bottom-right-radius: 26px;
		z-index: 100;
		background-color: rgba(0, 0, 0, 0.5);
		will-change: transform;
	}

	/* HEADINGS */
	.header-section {
		padding: 0 15px;
		text-align: center;
		margin: 40vh auto 50vh;
	}

	/* SCROLL DOWN */
	.scroll-down {
		position: absolute;
		bottom: 30px;
		left: 50%;
		transform: translate(-50%, 0);
		color: black;
		font-weight: 400;
		text-transform: uppercase;
		font-size: 16px;
		overflow: visible;
	}
	.scroll-down .arrow {
		position: relative;
		top: -4px;
		margin: 0 auto;
		width: 20px;
		height: 20px;
		background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KPHBhdGggZmlsbD0iYmxhY2siIGQ9Ik00ODMuMiwxOTIuMmMtMjAuNS0yMC41LTUzLjUtMjAuOC03My43LTAuNkwyNTcsMzQ0LjFMMTA0LjUsMTkxLjZjLTIwLjItMjAuMi01My4yLTE5LjktNzMuNywwLjYKCWMtMjAuNSwyMC41LTIwLjgsNTMuNS0wLjYsNzMuN2wxOTAsMTkwYzEwLjEsMTAuMSwyMy40LDE1LjEsMzYuOCwxNWMxMy4zLDAuMSwyNi43LTQuOSwzNi44LTE1bDE5MC0xOTAKCUM1MDMuOSwyNDUuNyw1MDMuNywyMTIuNyw0ODMuMiwxOTIuMnoiLz4KPC9zdmc+);
		background-size: contain;
	}

	.arrow-right {
		transform: rotate(-90deg);
		position: relative;
		top: -4px;
		margin: 1rem auto;
		width: 20px;
		height: 20px;
		background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KPHBhdGggZmlsbD0iYmxhY2siIGQ9Ik00ODMuMiwxOTIuMmMtMjAuNS0yMC41LTUzLjUtMjAuOC03My43LTAuNkwyNTcsMzQ0LjFMMTA0LjUsMTkxLjZjLTIwLjItMjAuMi01My4yLTE5LjktNzMuNywwLjYKCWMtMjAuNSwyMC41LTIwLjgsNTMuNS0wLjYsNzMuN2wxOTAsMTkwYzEwLjEsMTAuMSwyMy40LDE1LjEsMzYuOCwxNWMxMy4zLDAuMSwyNi43LTQuOSwzNi44LTE1bDE5MC0xOTAKCUM1MDMuOSwyNDUuNyw1MDMuNywyMTIuNyw0ODMuMiwxOTIuMnoiLz4KPC9zdmc+);
		background-size: contain;
	}
</style>
