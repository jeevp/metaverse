<script>
	import { DataSet } from 'vis-data';
	import { Timeline } from 'vis-timeline';
	import { onMount } from 'svelte';
	import Paragraph from './Paragraph.svelte';

	let root;
	let currentItem = null;

	// Create a DataSet (allows two way data-binding)
	const items = new DataSet([
		{
			content: 'item 1',
			start: '2014-04-20',
			image:
				'https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			className: 'image'
		},
		{
			content: 'Facebook rebrands to Meta',
			start: '2014-04-14',
			image:
				'https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
			className: 'featured'
		},
		{ content: 'item 3', start: '2014-04-18', type: 'point' },
		{ content: 'item 4', start: '2014-04-16', type: 'point' },
		{ content: 'item 5', start: '2014-04-25', type: 'point' },
		{ content: 'item 6', start: '2014-04-27', type: 'point' }
	]);

	let el;

	const renderItem = (item) => {
		if (item.type !== 'point') {
			return `
		        <div>
		            <div>
		                <span>${item.content}</span>
		                <img src="${item.image}" alt="${item.content}"></img>
		            </div>
		        </div>
		    `;
		} else {
			return `
		        <div>
		            <span>${item.content}</span>
		        </div>
		    `;
		}
	};

	// Configuration for the Timeline
	const options = {
		height: '400px',
		preferZoom: true,
		zoomMax: 1577000000000, // 50 years
		zoomMin: 604800000, // 1 day
		zoomFriction: 30,
		// zoomKey: 'shiftKey',
		min: new Date('1960'),
		max: new Date('2040'),
		start: new Date('2014'),
		end: new Date('2015'),
		template: (item) => renderItem(item)
	};

	onMount(() => {
		let container = root.querySelector('#vis-timeline');
		const timeline = new Timeline(container, items, options);
		timeline.on('select', function (event, properties) {
			console.log(event.items);
			currentItem = event.items[0];
		});
	});
</script>

<svelte:head>
	<link
		href="https://unpkg.com/vis-timeline@latest/styles/vis-timeline-graph2d.min.css"
		rel="stylesheet"
		type="text/css"
	/>
</svelte:head>

<div bind:this={root} class="timeline-container full-width">
	<div id="vis-timeline" />
	<div id="timeline-details">
		<div>
			<span>{items.get(currentItem).content}</span>
			<img src={items.get(currentItem).image} alt={items.get(currentItem).content} />
		</div>
	</div>
</div>

<style>
	.timeline-container {
		margin: 100px 0;
		z-index: 3;
		background-color: #eff0f3;
	}

	#vis-timeline {
		margin: 100px 0;
		font-family: var(--ui-font);
		font-size: 0.9em;
	}

	.vis-timeline {
		cursor: grab;
		margin: 0 auto;
		border: 0;
	}

	:global(.vis-timeline:active) {
		cursor: grabbing !important;
	}

	:global(.timeline-wrapper) {
		cursor: grab;
		margin: 0 auto;
		border: 0;
	}

	:global(.timeline-wrapper:active) {
		cursor: grabbing !important;
	}

	:global(.vis-current-time) {
		width: 5px;
	}
	:global(.vis-current-time::before) {
		content: 'Today';
		font-weight: 600;
		position: absolute;
		width: auto;
		margin-left: 10px;
	}

	:global(.vis-item) {
		font-size: 0.8em;
		font-weight: 600;
		background: none;
		cursor: pointer;
		border-color: #bfbfbf;
	}

	:global(.vis-panel.vis-bottom) {
		font-size: 0.9rem;
		font-weight: 600;
	}

	:global(.vis-item-content) {
		padding: 0;
	}

	:global(.vis-item-content > div > span) {
		padding: 0;
		background: none;
	}

	:global(.vis-item-content > div > span:hover) {
		border-color: black;
	}

	:global(.vis-item-content > div > span),
	:global(.vis-item-content > div > div) {
		padding: 4px 8px;
		border-radius: 4px;
		width: fit-content;
		transition: 0.2s all;
	}

	:global(.vis-item.vis-line) {
		border-color: green;
	}

	:global(.vis-item.vis-box) {
		border: none;
	}

	:global(.vis-item .vis-item-overflow) {
		overflow: visible;
	}

	:global(.vis-item-content > div > div) {
		background: #e0edde;
		display: flex;
		align-items: center;
	}

	:global(.vis-item-content img) {
		max-width: 50px;
		width: 100%;
		margin: 0;
		margin-left: 10px;
		min-width: 36px;
	}

	#timeline-details img {
		max-width: 40%;
	}
</style>
