<script>
	import { onMount, onDestroy } from 'svelte';
	import copy from '../data/copy.json';

	onMount(() => {
		let images = gsap.utils.toArray('.phase');

		gsap.to(images, {
			xPercent: -100 * (images.length - 0.7),
			ease: 'none',
			scrollTrigger: {
				markers: true,
				trigger: '#wrap',
				pin: '#wrap',
				scrub: 1,
				start: 'top top',
				// snap: {
				// 	snapTo: 1 / (images.length - 1),
				// 	duration: 0.1,
				// 	delay: 0.1,
				// 	ease: 'power1.inOut'
				// },
				end: '+=8000'
			}
		});

		// console.log(ScrollTrigger.getAll());
	});
</script>

<div id="wrap" class="full-width">
	<div class="phases-container grid-wrapper">
		<h3 class="start3 end12">Baudrillard's four phases of the image:</h3>
		<p class="start3 end10 tag">
			Donec ultricies nec purus sed hendrerit. Vivamus a nulla ac elit dignissim ornare tempor in
			odio. Aenean sed ultrices eros, ut vulputate nibh. Mauris eu dui convallis, vulputate justo
			sed, viverra ligula. Morbi imperdiet, mauris in venenatis vestibulum, metus lectus tempor
			eros, non dictum nisi sem vel ligula.
		</p>
		<div class="scroller full-width">
			<div class="phases">
				{#each copy.imagePhases as phase, i}
					<div class="phase">
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
	</div>
</div>

<style>
	#wrap {
		background-color: blueviolet;
	}

	h3 {
		margin-bottom: 0.5em;
	}

	p.tag {
		font-size: 0.9em;
	}

	.phases-container {
		padding: 4rem 0;
		margin: 4rem 0;
		background: white;
		max-height: fit-content;
		overflow: hidden;
		height: 100vh;
	}

	.scroller {
		margin: 100px;
	}

	.phases {
		display: flex;
	}

	.phase {
		padding: 2em 3em;
		padding-top: 3em;
		margin: 0 3em;
		flex: 1;
		display: flex;
		background-color: #eaeff1;
		border-radius: 10px;
		height: auto;
	}

	.phase img {
		margin: 0 auto;
		display: inline-block;
		min-width: 500px;
		align-self: flex-start;
	}

	.details {
		margin-left: 2em;
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
