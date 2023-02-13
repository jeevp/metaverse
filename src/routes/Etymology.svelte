<script>
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { onMount } from 'svelte';

	gsap.registerPlugin(ScrollTrigger);

	onMount(() => {
		// gsap.to('.container', {
		// 	scrollTrigger: '.container', // start the animation when ".box" enters the viewport (once)
		// 	x: 500
		// });
		const tl = gsap.timeline();

		tl.to('#meta h1', {
			x: -100
		})
			.to(
				'#verse h1',
				{
					x: 100
				},
				'<'
			)
			.fromTo('.definition', { opacity: 0 }, { opacity: 1 });
		// .fromTo('.container', { borderColor: 'transparent' }, { borderColor: 'black' }, '<');

		ScrollTrigger.create({
			trigger: '.container',
			start: '-200',
			end: '+=400',
			toggleActions: 'restart none none none',
			pin: true,
			scrub: true,
			animation: tl,
			markers: true
		});
	});
</script>

<div class="start3 end12 container">
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
	.container {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		/* background-color: white; */
		margin-top: 100px;
		margin-bottom: 40px;
		position: relative;
		border-top: 1px solid black;
		border-left: 1px solid black;
		padding: 50px;
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
