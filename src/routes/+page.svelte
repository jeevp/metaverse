<!-- <SvgFilters /> -->
<script>
	import copy from '../data/copy.json';
	import { ArrowRight } from 'lucide-svelte';
	import Splash from './Splash.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import MediaQuery from './MediaQuery.svelte';

	let ready = false;

	onMount(() => {
		ready = true;
	});
</script>

<MediaQuery query="(max-width: 1000px)" let:matches>
	{#if matches}
		<div class="too-small">
			<nav>
				<span class="title">
					<strong>The Metaverse</strong> &mdash; An Interdisciplinary Visual Essay
				</span>
			</nav>
			<div class="root tablet">
				<span>
					Due to its interactive elements, this website is best viewed at larger screen sizes. Try
					using a laptop/desktop or read the PDF version instead (available soon).
				</span>
			</div>
		</div>
	{:else}
		<div id="wrapper">
			<div id="splash">
				<Splash />
			</div>
			{#if ready}
				<div id="page-content" in:fade|global={{ duration: 300, delay: 600 }}>
					<div id="toc-container">
						<header>
							<div class="title">
								<h4>The Metaverse</h4>
								<h4 style="font-weight: 400">An Interdisciplinary Visual Essay</h4>
							</div>
							<div class="details">
								<span>Jeev Prayaga</span>
								<!-- <span>Grinnell College</span> -->
							</div>
						</header>
						<section id="intro">
							<!-- <p class="description">
								To answer this question, I identified three broad themes to guide an analysis of the
								metaverse's potential impacts.
							</p> -->
						</section>

						<section>
							<a role="button" href="/background">
								<span class="name">Background&nbsp;<ArrowRight size="18" /></span>
								<p class="theme-q">What is the metaverse?</p>
								<p class="theme-desc">
									Get some context with a definition, timeline, and technological overview of the
									metaverse.
								</p>
							</a>
						</section>

						<section id="analysis">
							<!-- <h5 class="label">Analysis:</h5> -->
							<div class="analysis-intro">
								<h5 class="question">Would the metaverse fundamentally benefit human society?</h5>
								<p class="description">
									To answer this question, I identified three broad themes to frame the potential
									impacts of the metaverse on different facets of human society.
								</p>
							</div>
							<nav>
								<a role="button" href="/identity" id="identity-btn">
									<span class="name">Identity&nbsp;<ArrowRight size="18" /></span>
									<p class="theme-q">
										{copy.identityHook}
									</p>
									<p class="theme-desc">
										{copy.identityByline}
									</p>
								</a>
								<a role="button" href="/reality" id="reality-btn">
									<span class="name">Reality&nbsp;<ArrowRight size="18" /></span>
									<p class="theme-q">
										{copy.realityHook}
									</p>
									<p class="theme-desc">
										{copy.realityByline}
									</p>
								</a>
								<a role="button" href="/capitalism" id="capitalism-btn">
									<span class="name">Capitalism&nbsp;<ArrowRight size="18" /></span>
									<p class="theme-q">
										{copy.capitalismHook}
									</p>
									<p class="theme-desc">
										{copy.capitalismByline}
									</p>
								</a>
								<a role="button" href="/conclusion">
									<span class="name">Conclusion&nbsp;<ArrowRight size="18" /></span>
								</a>
							</nav>
						</section>
						<section>
							<a role="button" href="/references">
								<span class="name">References&nbsp;<ArrowRight size="18" /></span>
							</a>
						</section>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</MediaQuery>

<style>
	#wrapper {
		overflow: auto;
		-webkit-scroll-snap-type: y mandatory;
		-ms-scroll-snap-type: y mandatory;
		scroll-snap-type: y mandatory;
		height: 100vh;
	}

	#splash {
		/* background-color: black; */
		color: white;
		height: calc(100vh - 120px);
		scroll-snap-align: start;
	}

	#page-content {
		height: 100vh;
		scroll-snap-align: start;
		overflow-y: scroll;
	}

	#toc-container {
		width: 80%;
		max-width: 800px;
		margin: 0 auto;
		padding: 0;
		height: fit-content;
		padding-bottom: 4em;
	}

	header {
		height: 120px;
		line-height: 1.2;
		padding: 2em 1.6em;
		display: flex;
		justify-content: space-between;
	}

	#intro {
		padding: 0 1.6em;
		margin-bottom: 2em;
	}

	.details span {
		display: block;
		font-size: 1.1rem;
	}

	h5 {
		line-height: 1.2;
		font-size: 1.2rem;
	}

	.analysis-intro {
		padding: 0 0.6em;
	}

	.description {
		font-size: 1.1rem;
		margin: 0.6em 0;
	}

	nav {
		margin-top: 1.4em;
	}

	a[role='button'] {
		display: block;
		padding: 0.6em;
		text-decoration: none;
		color: inherit;
		transition: 0.2s all;
		background-color: #e6eaed;
		border-radius: 0.2rem;
	}

	nav a[role='button'] {
		text-decoration: none;
		color: inherit;
		margin-bottom: 1em;
	}

	.name {
		text-transform: uppercase;
		letter-spacing: 0.03rem;
		font-weight: 600;
		font-size: 0.9rem;
		display: flex;
		align-items: flex-start;
	}

	.name::after {
		margin-left: 5px;
		font-weight: 600;
		transition: 0.2s all;
	}
	/* 
	a[role='button']:hover .name::after {
		margin-left: 10px;
	} */

	a[role='button']:hover {
		background-color: #d9e0e4;
		transform: scale(1.02);
	}

	.theme-q {
		font-style: italic;
		font-size: 1rem;
	}

	.theme-desc {
		font-size: 1rem;
	}

	section {
		border-radius: 0.3rem;
		padding: 0 1em;
	}

	#analysis {
		border: 1px dashed black;
		padding: 1em;
		margin: 2em 0;
	}

	#identity-btn {
		background-color: var(--light-blue);
		border: 1px solid var(--bold-blue);
	}
	#reality-btn {
		background-color: var(--light-purple);
		border: 1px solid var(--bold-purple);
	}
	#capitalism-btn {
		background-color: var(--light-green);
		border: 1px solid var(--bold-green);
	}

	.too-small nav {
		margin-bottom: 2em;
	}

	.too-small {
		width: 90%;
		margin: auto;
		max-width: 800px;
	}
</style>
