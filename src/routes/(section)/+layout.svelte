<script>
	import { page } from '$app/stores';

	import { fly } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';

	import { gsap } from 'gsap/dist/gsap.js';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

	import { fade } from 'svelte/transition';

	import { onMount, onDestroy } from 'svelte';
	const pages = ['background', 'identity', 'reality', 'capitalism', 'conclusion']; // TODO: add references page
	import { Home, ArrowLeft, ArrowRight } from 'svelte-lucide';
	import {
		identityTransition,
		realityTransition,
		capitalismTransition
	} from '../../data/copy.json';

	gsap.registerPlugin(ScrollTrigger);

	let ready = false;

	$: path = $page.url.pathname.slice(1);
	$: pageIndex = pages.indexOf($page.url.pathname.slice(1));
	$: nextIndex = pageIndex + 1 < pages.length ? pageIndex + 1 : -1;
	$: prevIndex = pageIndex - 1 >= 0 ? pageIndex - 1 : -1;

	// const duration = 300;
	// const delay = duration + 100;
	// const y = 10;

	// const transitionIn = { easing: cubicOut, y, duration, delay };
	// const transitionOut = { easing: cubicIn, y: -y, duration };

	export let data;

	onMount(() => {
		ready = true;
		// log all scrolltriggers
		// console.log(ScrollTrigger.getAll());
		// ScrollTrigger.killAll();
		// tl.kill(true);
		// ScrollTrigger.getById("trigger1").kill(true);
		// gsap.set("#element", {clearProps: true});

		var lastScrollTop; // This variable will store the top position

		const navbar = document.getElementById('navbar'); // Get The NavBar

		window.addEventListener('scroll', function () {
			//on every scroll this funtion will be called

			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			//This line will get the location on scroll

			if (scrollTop > lastScrollTop) {
				//if it will be greater than the previous
				navbar.style.top = '-80px';
				//set the value to the negetive of height of navbar
			} else {
				navbar.style.top = '0';
			}

			lastScrollTop = scrollTop; //New Position Stored
		});
	});

	// beforeNavigate(() => {
	// 	console.log('HELLO');
	// 	const trigs = ScrollTrigger.killAll();
	// 	console.log(trigs);
	// });
</script>

<nav id="navbar">
	{#if ready}
		<div id="home-btn">
			<a href="/" role="button">
				<Home size="18" />
				&nbsp;Home
			</a>
		</div>
		<span class="title">
			<strong>The Metaverse</strong> &mdash; An Interdisciplinary Visual Essay
		</span>
		<div class="page-buttons">
			<div>
				{#if prevIndex >= 0}
					<a href={`/${pages[prevIndex]}`} style="float: left;" data-sveltekit-reload>
						<ArrowLeft size="18" />
						&nbsp;
						<span>{pages[prevIndex]}</span>
					</a>
				{/if}
			</div>

			<div>
				<span>
					<strong>
						{path}
					</strong>
				</span>
			</div>

			<div>
				{#if nextIndex >= 0}
					<a href={`/${pages[nextIndex]}`} style="float: right;" data-sveltekit-reload>
						<span>{pages[nextIndex]}</span>
						&nbsp;
						<ArrowRight size="18" />
					</a>
				{/if}
			</div>
		</div>
	{/if}
	<!-- 
	{#each pages as p, i}
		<a href={`/${p}`} class:active={pageIndex === i}>{p}</a>
	{/each} -->
</nav>

{#if ready}
	<div class="page-container" in:fade={{ duration: 300, delay: 400 }}>
		<slot />
		<!-- <div class="grid-wrapper" /> -->
		<div class="grid-bg">
			{#each { length: 12 } as _, i}
				<div class="grid-line" />
			{/each}
		</div>
		<div class="next-section grid-wrapper">
			<div class="start3 end11 transition">
				{#if nextIndex >= 0}
					<div>
						<h5>Next section:</h5>
						<h4>{pages[nextIndex]}</h4>
					</div>
					<p>
						{#if nextIndex === 1}
							{identityTransition}
						{:else if nextIndex === 2}
							{realityTransition}
						{:else if nextIndex === 3}
							{capitalismTransition}
						{/if}
					</p>
					<a href={`/${pages[nextIndex]}`}>
						Continue reading&nbsp;
						<ArrowRight size="18" />
					</a>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.next-section {
		color: var(--light);
		background-color: #0c2228;
	}

	.next-section .transition {
		padding: 100px 0;
		/* background-color: lightgreen; */
		border-radius: 10px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.next-section a {
		background-color: #edf1f4;
		color: var(--dark);
		font-size: 1.1rem;
	}

	.next-section p {
		flex: 0.75;
		font-size: 1.1rem;
	}

	.transition h5 {
		letter-spacing: 0.03rem;
		font-size: 1rem;
		text-transform: uppercase;
	}

	.transition h4 {
		font-weight: 400;
		font-size: 1.7rem;
		text-transform: capitalize;
	}

	nav {
		background-color: white;
		width: 100vw;
		transition: 0.3s;
		position: fixed;
		top: 0;
		z-index: 3;
		font-size: 1rem;
		display: flex;
		text-transform: capitalize;
		border-bottom: 1px solid rgba(16, 22, 54, 0.3);
		box-shadow: 0 1px 6px 0px rgba(0, 0, 0, 0.1);
		align-items: center;
	}

	nav a span {
		text-transform: capitalize;
	}

	.title {
		flex: 1;
		text-align: center;
	}

	.page-buttons {
		display: flex;
		padding: calc(var(--gutter) / 2);
		align-items: center;
		flex: 1;
		background-color: #edf1f4;
	}

	#home-btn {
		height: 100%;
		padding: calc(var(--gutter) / 2);
		font-weight: 600;
		color: inherit;
		font-size: 1rem;
		text-decoration: none;
		margin-right: 1em;
		padding-right: 2em;
		display: flex;
		align-items: center;
		flex: none;
	}

	nav div {
		flex: 1;
		text-align: center;
	}

	nav div span {
		text-align: center;
	}

	a {
		text-decoration: none;
		padding: 5px 10px;
		border-radius: 10px;
		color: inherit;
		display: flex;
		align-items: center;
		width: fit-content;
		transition: 0.2s all;
	}
	a:hover {
		background-color: #d9e0e4;
	}

	.page-container {
		width: calc(100% - var(--gutter));
		margin: 0 auto;
	}

	.grid-bg {
		display: grid;
		width: calc(100% - var(--gutter));
		height: 1000px;
		position: fixed;
		top: 0;
		left: calc(var(--gutter) / 2);
		z-index: -1;
		grid-template-columns: repeat(6, minmax(0, 1fr));
	}

	.grid-bg::after {
		content: '';
		position: absolute;
		right: 0;
		height: 100%;
		border-right: 2px dotted black;
	}

	.grid-bg > .grid-line {
		/* border-right: 0.5px dashed black;
		border-left: 0.5px dashed black; */
		background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMiIgaGVpZ2h0PSIxNDQ5IiB2aWV3Qm94PSIwIDAgMiAxNDQ5IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMC41IDBMMS41IDE0NDguNSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLWRhc2hhcnJheT0iMSA3Ii8+Cjwvc3ZnPgo=');
		background-repeat: repeat-y;
	}
	.grid-bg > .grid-line:first-child {
		margin-left: 0;
	}
</style>
