<script>
	import { DataSet } from 'vis-data';
	import { Timeline } from 'vis-timeline';
	import { onMount } from 'svelte';
	import Paragraph from './Paragraph.svelte';

	export let data;
	let root;
	let currentItem = null;

	// Create a DataSet (allows two way data-binding)
	const groups = new DataSet([
		{
			id: 'art',
			content: 'art & media',
			color: 'green'
		},
		{
			id: 'tech',
			content: 'technology',
			color: 'red'
		}
	]);

	const renderGroupLabel = (groupData) => {
		const item = document.createElement('div');
		item.classList = ['group-label'];
		item.innerHTML = groupData.content;
		item.style.color = groupData.color;
		item.style.borderColor = groupData.color;
		return item;
	};

	const items = new DataSet(
		data.map((item) => ({
			content: item.name,
			...(item.description && { description: item.description }),
			start: item.start,
			...(item.end && { end: item.end === 'Today' ? new Date() : item.end }),
			...(item.image && { image: `tl_images/${item.image}` }),
			size: item.size ? item.size : 'small',
			type: item.type ? item.type : 'point',
			...(item.group && { group: item.group }),
			className:
				item.type === 'background'
					? item.fuzzy
						? 'fuzzy'
						: ''
					: `dot-${groups.get(item.group).color}`
		}))
	);

	const renderItem = (itemData) => {
		const item = document.createElement('div');
		const name = document.createElement('span');
		name.innerHTML = itemData.content;
		const img = document.createElement('img');
		img.setAttribute('src', itemData.image);
		img.setAttribute('alt', itemData.content);
		if (itemData.image) {
			if (itemData.size === 'big') {
				item.classList = ['featured'];
			} else {
				item.classList = ['small'];
			}
			item.appendChild(img);
		}
		item.appendChild(name);
		console.log(item);
		return item;
	};

	// Configuration for the Timeline
	const options = {
		height: '500px',
		preferZoom: true,
		stackSubgroups: true,
		zoomMax: 1577000000000, // 50 years
		zoomMin: 604800000, // 1 day
		zoomFriction: 30,
		// zoomKey: 'shiftKey',
		min: new Date('1960'),
		max: new Date('2040'),
		start: new Date('1980'),
		end: new Date('2030'),
		template: (item) => renderItem(item),
		groupTemplate: (item) => renderGroupLabel(item)
	};

	onMount(() => {
		let container = root.querySelector('#vis-timeline');
		const timeline = new Timeline(container, items, groups, options);
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

<div bind:this={root} class="wrapper full-width">
	<div class="timeline-container">
		<div id="vis-timeline" />
		{#if currentItem}
			<div id="timeline-details">
				<div class="details-container">
					<span class="item-group">{@html groups.get(items.get(currentItem).group).content}</span>
					<span class="item-date">{items.get(currentItem).start}</span>
					<div class="item-description">
						{#if items.get(currentItem).image}
							<div class="item-image">
								<img src={items.get(currentItem).image} alt={items.get(currentItem).content} />
							</div>
						{/if}
						<div class="item-content">
							<span class="item-name">{@html items.get(currentItem).content}</span>
							<p>{@html items.get(currentItem).description}</p>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.timeline-container {
		/* margin: 100px 0; */
		background-color: white;
		z-index: 1;
		margin-bottom: 300px;
		height: calc(100vh - var(--gutter));
		background-color: var(--light);
	}

	#vis-timeline {
		/* margin: 100px 0; */
		font-family: 'league mono narrow';
		font-size: 0.9em;
		font-weight: 300;
		background-color: white;
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
		width: 3px;
		opacity: 0.7;
	}
	:global(.vis-current-time::before) {
		content: 'Today';
		font-weight: 500;
		font-size: 0.9em;
		position: absolute;
		width: auto;
		bottom: 0;
		margin-left: 10px;
	}

	:global(.vis-item.vis-background) {
		border-left: 1px solid #0d1665;
	}

	:global(.vis-item.vis-background.fuzzy) {
		background: rgba(222, 239, 255, 0.3);
		border-left-style: dashed;
	}

	:global(.vis-item) {
		font-size: 0.8em;
		font-family: var(--sans-font);
		background: none;
		cursor: pointer;
		border-color: var(--dotColor);
	}

	:global(.dot-green) {
		border-color: green !important;
	}
	:global(.dot-purple) {
		border-color: purple !important;
	}
	:global(.dot-red) {
		border-color: red !important;
	}
	/* 
	:global(.vis-dot) {
		border-color: green;
	} */

	:global(.vis-panel.vis-bottom) {
		font-size: 0.9rem;
	}

	/* :global(.vis-content) {
		z-index: 1;
	} */

	:global(.group-label) {
		font-size: 0.8em;
		text-transform: uppercase;
		font-family: 'League Mono';
		font-weight: 600;
		margin-left: 10px;
		margin-right: 20px;
		border-bottom: 1px solid;
	}

	:global(.vis-item.vis-point) {
		display: flex;
		align-items: center;
	}

	:global(.vis-item.vis-point .vis-dot) {
		position: static !important;
		top: 0;
	}

	:global(.vis-item-content) {
		padding: 0;
		order: 2;
		margin-left: -2px !important;
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

	:global(.vis-item .vis-item-content span) {
		max-width: 300px;
		line-height: 1.2;
		white-space: initial;
	}

	:global(.vis-item-content .featured) {
		/* background: var(--light); */
		display: flex;
		align-items: center;
		padding: 0.5em;
		font-size: 1.2em;
		font-weight: 600;
		border-radius: 0.2em;
	}

	:global(.vis-item-content .featured img) {
		max-width: 100px;
		max-height: 100px;
		margin: 0;
		min-width: 36px;
		margin-right: 10px;
	}

	:global(.vis-item-content .small) {
		display: flex;
		align-items: center;
	}

	:global(.vis-item-content .small img) {
		max-width: 40px;
		max-height: 40px;
		width: 100%;
		margin: 0;
		min-width: 36px;
	}

	:global(.vis-selected) {
		background: #f9f2bb !important;
		border-radius: 0.2em;
	}

	#timeline-details .details-container {
		width: 80%;
		max-width: 800px;
		margin: auto;
		font-size: 1rem;
		padding: 1em 2em;
	}

	.details-container .item-group {
		text-transform: uppercase;
		display: block;
		font-family: 'League Mono';
		float: right;
	}
	.details-container .item-date {
		text-transform: uppercase;
		display: block;
		font-family: 'League Mono';
		float: left;
	}

	.details-container .item-name {
		font-size: 1.5em;
		font-weight: 600;
		display: block;
		margin-bottom: 0.7em;
	}
	.item-description {
		height: fit-content;
		display: flex;
		padding-top: 2em;
		clear: both;
	}
	.item-description .item-image {
		min-width: 200px;
		padding-right: 2em;
		padding-bottom: 1em;
	}
	.item-description .item-content {
		flex: 1.5;
	}

	.item-description .item-image img {
		max-width: 300px;
		max-height: 180px;
		/* margin: auto; */
	}
</style>
