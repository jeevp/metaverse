<script>
	import { gsap } from 'gsap/dist/gsap.js';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js';
	import { idDescription1, idDescription2 } from '../../../data/copy.json';

	import { onMount } from 'svelte';
	gsap.registerPlugin(ScrollTrigger);

	onMount(() => {
		const tl = gsap
			.timeline()
			.fromTo('#card', { opacity: 0 }, { opacity: 1 })
			.fromTo('#card > *', { opacity: 0 }, { opacity: 1 })
			.fromTo('#card', { scale: 0.5 }, { scale: 1, x: 200 })
			.fromTo('#description-1', { opacity: 0, y: -100 }, { opacity: 1, y: 0 })
			.fromTo('#card img', { opacity: 0 }, { opacity: 1 })
			.fromTo('.group span', { opacity: 0 }, { opacity: 1 }, '<')
			.to('#card', { scale: 0.5, x: 0 })
			.fromTo('#card > *', { opacity: 1 }, { opacity: 0 })
			.fromTo('#description-1', { opacity: 1, y: 0 }, { opacity: 0, y: 100 }, '<')
			.fromTo(
				'#card',
				{ background: 'white' },
				{ background: 'linear-gradient(252.36deg, #DAEDFF -1.26%, #FFCEF4 101.05%)' }
			)
			.fromTo('.first', { display: 'block' }, { display: 'none' })
			.fromTo('.second', { display: 'none', opacity: 0 }, { display: 'block', opacity: 0 })
			.fromTo('#card > *', { opacity: 0 }, { opacity: 1 })
			.to('#card', { scale: 1, x: -200 })
			.fromTo('#description-2', { opacity: 0, y: -100 }, { opacity: 1, y: 0 })
			.fromTo('.second', { opacity: 0 }, { opacity: 1 }, '<');

		ScrollTrigger.create({
			trigger: '#idcard-container',
			start: '0',
			end: '+=1500',
			toggleActions: 'restart none none none',
			pin: true,
			scrub: true,
			animation: tl
			// markers: true
		});
	});
</script>

<div id="idcard-container" class="full-width">
	<div id="description-1" class="desc">
		<h5>"James"</h5>
		{@html idDescription1}
	</div>
	<div id="description-2" class="desc">
		<h5>"h1t0m1_"</h5>
		{@html idDescription2}
	</div>
	<div id="card">
		<h4>Identification Document</h4>
		<div class="content">
			<div class="img">
				<img src="./profile-before.png" alt="A real-life photograph of a man" class="first" />
				<img src="./profile-after.png" alt="A real-life photograph of a man" class="second" />
			</div>
			<div class="info">
				<div class="main">
					<div class="group big">
						<h5>Name</h5>
						<span class="first">James Hubert</span>
						<span class="second">h1t0m1_</span>
					</div>
					<div class="group big">
						<h5>Age</h5>
						<span class="first">33</span>
						<span class="second">25</span>
					</div>
				</div>
				<div class="details">
					<div class="group">
						<h5>Gender</h5>
						<span class="first">Male</span>
						<span class="second">Female</span>
					</div>
					<div class="group">
						<h5>Height</h5>
						<span class="first">5'8"</span>
						<span class="second">5'4"</span>
					</div>
					<div class="group">
						<h5>Weight</h5>
						<span class="first">185 lbs</span>
						<span class="second">130 lbs</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	#idcard-container {
		position: relative;
		background-color: #e1e2eb;
		height: 100vh;
		margin: 4em 0;
		padding-top: 30vh;
	}

	#card {
		border: 3px solid var(--dark);
		width: 700px;
		font-family: 'League Mono Narrow';
		margin: auto;
		background-color: white;
		border-radius: 0.7em;
		padding: 1.5em 2em;
		padding-bottom: 1em;
		font-size: 1.5rem;
	}

	.second {
		display: none;
		opacity: 0;
	}

	.desc {
		position: absolute;
		background-color: white;
		max-width: 400px;
		font-size: 0.9em;
		padding: 1em;
		border-radius: 0.3em;
	}

	.desc h5 {
		font-family: var(--ui-font);
		font-size: 1.1em;
		margin-bottom: 1em;
	}

	#description-1 {
		left: 100px;
		top: 30vh;
	}

	#description-2 {
		right: 100px;
		top: 20vh;
	}

	.content {
		display: flex;
	}

	.img {
		box-shadow: inset 0 0 0 2px var(--dark);
		max-width: 200px;
		min-width: 200px;
		min-height: 220px;
		max-height: 220px;
		margin-right: 1em;
	}

	h4 {
		font-family: var(--ui-font);
		text-transform: uppercase;
		font-size: 0.9em;
		margin-bottom: 1.5em;
	}

	#card h5 {
		text-transform: uppercase;
	}

	img {
		margin-right: 2em;
		width: 200px;
		height: 220px;
		max-width: 200px;
		max-height: 220px;
	}

	.info {
		flex: 1;
		padding: 0.5em 0;
	}

	.main {
		display: flex;
		justify-content: space-between;
	}

	.group {
		margin-bottom: 1em;
		display: inline-block;
	}

	.group.big span {
		font-size: 1.4em;
	}

	.details {
		border-top: 1px solid var(--dark);
		display: flex;
		padding-top: 1em;
		justify-content: space-between;
	}
</style>
