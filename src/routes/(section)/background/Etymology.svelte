<script>
	import { gsap } from 'gsap/dist/gsap.js';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';

	import { onMount } from 'svelte';

	gsap.registerPlugin(ScrollTrigger);

	onMount(() => {
		const tl = gsap.timeline();

		tl.to('#meta .word', {
			x: -100
		})
			.to(
				'#verse .word',
				{
					x: 100
				},
				'<'
			)
			.fromTo('.definition', { opacity: 0 }, { opacity: 1 });

		ScrollTrigger.create({
			trigger: '#etymology-container',
			start: '-200',
			end: '+=400',
			toggleActions: 'restart none none none',
			pin: true,
			scrub: true,
			animation: tl
			// markers: true
		});
	});
</script>

<div class="start2 end11" id="etymology-container">
	<h4>Etymology</h4>
	<div class="word-group" id="meta">
		<h1 class="word">meta</h1>
		<div class="definition">
			prefix, borrowed from Greek "μετα-"<br />
			<strong>"beyond, above, at a higher level"</strong>
		</div>
	</div>
	<div class="word-group" id="verse">
		<h1 class="word">verse</h1>
		<div class="definition">
			from English "universe"<br />
			<strong>"an all-encompassing entity or world"</strong>
			<br />
			<strong>"an alternate or subjective reality"</strong>
		</div>
	</div>
</div>

<style>
	#etymology-container {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		/* background-color: white; */
		margin-top: 100px;
		margin-bottom: 40px;
		position: relative;
		/* border-top: 1px solid black; */
		/* border-bottom: 1px solid black; */
		/* border-left: 6px solid black; */
		padding: 50px;
		background-color: #e4e7f5;
		border-radius: 0.3rem;
		font-size: 1.1rem;
	}

	h4 {
		position: absolute;
		top: 1em;
		left: 1em;
	}

	.word-group {
		width: fit-content;
		flex: 1;
	}

	.word {
		font-weight: 400;
		font-family: 'League Mono';
		text-transform: uppercase;
	}

	.definition {
		/* font-family: var(--serif-font); */
		margin-top: 0.6em;
	}

	#meta h1,
	#meta .definition {
		text-align: right;
	}

	#meta .definition {
		padding-right: 100px;
	}

	#verse .definition {
		padding-left: 100px;
	}
</style>
