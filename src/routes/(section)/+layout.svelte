<script>
	import { page } from '$app/stores';
	import { gsap } from 'gsap/dist/gsap.js';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import MediaQuery from '../MediaQuery.svelte';
	const pages = ['background', 'identity', 'reality', 'capitalism', 'conclusion', 'references'];
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

	onMount(() => {
		ready = true;
		var lastScrollTop;
		const navbar = document.getElementById('navbar');

		window.addEventListener('scroll', function () {
			var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
			if (scrollTop > lastScrollTop) {
				navbar.style.top = '-80px';
			} else {
				navbar.style.top = '0';
			}
			lastScrollTop = scrollTop;
		});
	});
</script>

<MediaQuery query="(min-width: 1001px)" let:matches>
	{#if ready && matches}
		<nav id="navbar">
			<div id="home-btn">
				<a href="/" role="button" data-sveltekit-reload>
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
		</nav>

		<div class="page-container" in:fade|global={{ duration: 300, delay: 400 }}>
			<slot />
			<div class="grid-bg">
				{#each { length: 12 } as _, i}
					<div class="grid-line" />
				{/each}
			</div>
			{#if nextIndex !== -1}
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
							<a href={`/${pages[nextIndex]}`} data-sveltekit-reload>
								Continue reading&nbsp;
								<ArrowRight size="18" />
							</a>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	{/if}
</MediaQuery>

<MediaQuery query="(max-width: 1000px)" let:matches>
	{#if matches}
		<nav>
			<span class="title too-small">
				<strong>The Metaverse</strong> &mdash; An Interdisciplinary Visual Essay
			</span>
		</nav>
		<div class="root tablet">
			<span>
				Due to its interactive elements, this website is best viewed at larger screen sizes. Try
				using a laptop/desktop or read the PDF version instead (available soon).
			</span>
		</div>
	{/if}
</MediaQuery>

<style>
	.next-section {
		color: var(--light);
		background-color: #0c2228;
	}

	.next-section .transition {
		padding: 100px 0;
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

	.page-container,
	.page-container > * {
		max-width: var(--max-page-width);
		margin: auto;
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
		background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMiIgaGVpZ2h0PSIxNDQ5IiB2aWV3Qm94PSIwIDAgMiAxNDQ5IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNMC41IDBMMS41IDE0NDguNSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLWRhc2hhcnJheT0iMSA3Ii8+Cjwvc3ZnPgo=');
		background-repeat: repeat-y;
	}
	.grid-bg > .grid-line:first-child {
		margin-left: 0;
	}

	/* MEDIA QUERY STUFF */
	.root {
		position: fixed;
		left: 0;
		top: 15vh;
		right: 0;
		padding: 1em;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.root span {
		max-width: 800px;
	}

	.too-small {
		padding: 1em 0;
	}
</style>
