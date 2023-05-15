<script>
	import bgRefs from '../../../data/background.html?raw';
	import idRefs from '../../../data/identity.html?raw';
	import realRefs from '../../../data/reality.html?raw';
	import capRefs from '../../../data/capitalism.html?raw';
	import concRefs from '../../../data/conclusion.html?raw';
	import { Library, Scroll } from 'svelte-lucide';
</script>

<section class="grid-wrapper">
	<div class="start4 end10" id="refs-container">
		<div class="ref-section">
			<h3>
				<Scroll size="28" />&nbsp; Acknowledgements
			</h3>

			<p>
				This website was developed by <a
					target="_blank"
					rel="noopener noreferrer"
					href="https://jeev.me/">Jeev Prayaga</a
				>
				as a semester-long Mentored Advanced Project for the
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.grinnell.edu/academics/majors-concentrations/digital-studies"
					>Digital Studies</a
				>
				concentration at Grinnell College. Special thanks to Professor Sarah Purcell for her guidance
				and mentorship.
			</p>
			<p>
				This website was built using the <a
					target="_blank"
					rel="noopener noreferrer"
					href="https://kit.svelte.dev/">Svelte/SvelteKit</a
				>
				front end framework and is hosted on
				<a target="_blank" rel="noopener noreferrer" href="https://vercel.com/">Vercel</a>. It makes
				use of the
				<a target="_blank" rel="noopener noreferrer" href="http://archieml.org/"
					>ArchieML text format</a
				>
				and
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://developers.google.com/docs/api/how-tos/overview">Google Docs API</a
				>
				to display content. Other packages include
				<a target="_blank" rel="noopener noreferrer" href="https://greensock.com/gsap/">GSAP</a>
				for animations,
				<a target="_blank" rel="noopener noreferrer" href="https://www.chartjs.org/">Chart.js</a>
				for data visualizations,
				<a target="_blank" rel="noopener noreferrer" href="https://visjs.org/">vis.js</a> for the
				interactive timeline,
				<a target="_blank" rel="noopener noreferrer" href="https://threejs.org/">Three.js</a>
				for 3D graphics,
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.mendeley.com/reference-management/reference-manager">Mendeley</a
				>
				and
				<a target="_blank" rel="noopener noreferrer" href="https://citation.js.org/">Citation.js</a>
				for references, and
				<a target="_blank" rel="noopener noreferrer" href="https://blotter.js.org/">Blotter</a> for typographic
				effects.
			</p>
			<p>
				Type is set in <a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.productiontype.com/family/newsreader">Newsreader</a
				>,
				<a target="_blank" rel="noopener noreferrer" href="https://github.com/brycewilner/Standard"
					>Standard</a
				>, and
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.theleagueofmoveabletype.com/league-mono">League Mono</a
				>. Source code is available on
				<a target="_blank" rel="noopener noreferrer" href="https://github.com/jeevp/metaverse"
					>Github</a
				>.
			</p>
		</div>
		<div class="ref-section">
			<h3>
				<Library size="28" />&nbsp; References by section
			</h3>
			<h5>Background</h5>
			<div class="refs">
				{@html bgRefs}
			</div>
			<h5>Identity</h5>
			<div class="refs">
				{@html idRefs}
			</div>
			<h5>Reality</h5>
			<div class="refs">
				{@html realRefs}
			</div>
			<h5>Capitalism</h5>
			<div class="refs">
				{@html capRefs}
			</div>
			<h5>Conclusion</h5>
			<div class="refs">
				{@html concRefs}
			</div>
		</div>
	</div>
</section>

<style>
	section {
		--bg-color: #f7f4e9;
		--text-color: var(--dark);
		/* background-color: var(--pale-blue); */
		color: var(--text-color);
	}

	#refs-container {
		background-color: var(--light);
		padding: 140px 0;
	}

	p {
		font-size: 1rem;
		margin-bottom: 0.7rem;
	}

	p a {
		opacity: 0.7;
		color: inherit;
		text-underline-offset: 2px;
		text-decoration-thickness: 1px;
		text-decoration-color: #00000048;
	}

	p a:hover {
		opacity: 1;
		text-decoration-color: var(--dark);
	}

	h3 {
		display: flex;
		align-items: center;
		font-size: 1.2rem;
		margin-bottom: 1.5em;
		/* margin-left: -2.5rem; */
		padding-bottom: 0.3em;
		border-bottom: 1px solid #00000048;
	}

	.ref-section {
		margin-bottom: 3em;
	}

	.refs {
		padding-left: 1em;
		margin-bottom: 1.5em;
	}

	h5 {
		margin-bottom: 1em;
		text-transform: uppercase;
		letter-spacing: 0.03rem;
		font-weight: 600;
		font-size: 0.9rem;
	}

	:global(.csl-entry) {
		padding-left: 1em;
		text-indent: -1em;
		margin-bottom: 0.6em;
		font-size: 0.9rem;
	}

	ul {
		font-size: 1rem;
	}
</style>
