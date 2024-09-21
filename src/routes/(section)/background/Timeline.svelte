<script>
	import { DataSet } from 'vis-data';
	import { Timeline } from 'vis-timeline';
	import { onMount } from 'svelte';
	import { blur } from 'svelte/transition';
	import { ArrowRight, ArrowLeft } from 'lucide-svelte';

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

	// const renderGroupLabel = (groupData) => {
	// 	const item = document.createElement('div');
	// 	item.classList = ['group-label'];
	// 	item.innerHTML = groupData.content;
	// 	item.style.color = groupData.color;
	// 	item.style.borderColor = groupData.color;
	// 	return item;
	// };

	const items = new DataSet(
		data.map((item) => ({
			id: item.name,
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
		return item;
	};

	// Configuration for the Timeline
	const options = {
		height: '300px',
		// preferZoom: true,
		// stackSubgroups: true,
		zoomable: false,
		zoomMax: 315569260000, // 50 years
		zoomMin: 315569260000, // 1 day
		// zoomFriction: 30,
		// zoomKey: 'shiftKey',
		min: new Date('1945'),
		max: new Date('2040'),
		start: new Date('1945'),
		end: new Date('1955'),
		template: (item) => renderItem(item)
		// groupTemplate: (item) => renderGroupLabel(item)
	};

	let timeline, allItems;
	let currIndex = 0;

	const focusItem = () => {
		const item = allItems[currIndex];
		timeline.focus(item.id, { animation: true, zoom: false });
		timeline.setSelection(item.id);
		currentItem = item;
	};

	const nextItem = () => {
		currIndex++;
		focusItem();
	};

	const prevItem = () => {
		currIndex--;
		focusItem();
	};

	$: currentItem = allItems ? items.get(allItems[currIndex].id) : null;

	onMount(() => {
		let container = root.querySelector('#vis-timeline');
		timeline = new Timeline(container, items, options);

		allItems = items
			.get({
				fields: ['id', 'type', 'start']
			})
			.filter((item) => {
				return item.type == 'point';
			})
			.sort((a, b) => {
				return new Date(a.start).getTime() - new Date(b.start).getTime();
			});

		focusItem();

		timeline.on('select', function (event) {
			if (event.items.length > 0) {
				currIndex = allItems.findIndex((el) => event.items[0] === el.id);
			}
		});
		// timeline.on('rangechanged', function (event, properties) {
		// 	const selected = timeline.getSelection();
		// 	if (selected.length === 1) {
		// 		const selectedIsVisible = timeline.getVisibleItems().includes(selected[0]);
		// 		if (!selectedIsVisible) {
		// 			timeline.setSelection([]);
		// 			currentItem = null;
		// 		}
		// 	}
		// });
	});
</script>

<svelte:head>
	<link
		href="https://unpkg.com/vis-timeline@latest/styles/vis-timeline-graph2d.min.css"
		rel="stylesheet"
		type="text/css"
	/>
</svelte:head>

<div id="timeline" class="full-width grid-wrapper">
	<div id="timeline-details" class="start8 end13">
		{#if allItems}
			<div id="timeline-controls" class="start1 end8">
				<button on:click={prevItem} disabled={currIndex === 0}
					><ArrowLeft size="18" />&nbsp;Previous</button
				>
				<button on:click={nextItem} disabled={currIndex === allItems.length - 1}
					>Next &nbsp;<ArrowRight size="18" /></button
				>
			</div>
		{/if}
		{#key currIndex}
			<div
				class="details-container"
				in:blur|global={{ amount: 4, duration: 400, delay: 300 }}
				out:blur|global={{ amount: 4, duration: 300 }}
			>
				{#if currentItem}
					<div class="item-description">
						<span class="item-date">{currentItem.start}</span>
						<span class="item-name">{@html currentItem.content}</span>
						<p>{@html currentItem.description}</p>
					</div>
					{#if currentItem.image}
						<div class="item-image">
							<img src={currentItem.image} alt={currentItem.content} />
						</div>
					{/if}
				{/if}
			</div>
		{/key}
	</div>

	<div bind:this={root} class="wrapper start1 end8">
		<div class="timeline-container" bind:this={root}>
			<div id="vis-timeline" />
		</div>
	</div>
</div>

<style>
	#timeline {
		padding: 100px 0;
		padding-top: 50px;
		margin-top: 50px;
		background-color: white;
	}

	.timeline-container {
		/* margin: 100px 0; */
		z-index: 1;
		/* margin-bottom: 300px; */
		/* height: calc(100vh - var(--gutter)); */
	}

	#timeline-controls button:disabled,
	#timeline-controls button[disabled] {
		cursor: text;
	}

	#vis-timeline {
		font-family: 'League Mono Narrow';
		font-size: 0.9em;
		font-weight: 300;
		background-color: white;
		padding-right: 1em;
	}

	:global(.vis-timeline) {
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
	/* 
	:global(.dot-green) {
		border-color: green !important;
	}
	:global(.dot-purple) {
		border-color: purple !important;
	}
	:global(.dot-red) {
		border-color: red !important;
	} */
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
		font-family: 'League Mono Narrow';
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
		font-size: 1.1em;
		font-weight: 600;
		border-radius: 0.2em;
	}

	:global(.vis-item-content .featured img) {
		max-width: 60px;
		max-height: 60px;
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

	#timeline-details {
		z-index: 3;
		padding: 0 1em;
		height: 0;
		padding-left: 1em;
	}

	#timeline-details .details-container {
		font-size: 1rem;
		max-width: 650px;
		background-color: white;
		display: flex;
	}

	.details-container .item-date {
		text-transform: uppercase;
		display: block;
		font-family: 'League Mono';
	}

	.details-container .item-name {
		font-size: 1.2em;
		font-weight: 600;
		display: block;
		margin-bottom: 0.5em;
	}
	.item-description {
		height: fit-content;
	}

	.details-container .item-image {
		margin-left: 2em;
	}

	.details-container .item-image img {
		max-width: 200px;
		max-height: 180px;
		float: right;
		/* margin: auto; */
	}

	#timeline-controls {
		margin-bottom: 2em;
		font-size: 1rem;
		width: 100%;
		display: flex;
	}

	#timeline-controls button {
		display: flex;
		align-items: center;
		margin-right: 0.6em;
		color: var(--dark);
		border-radius: 0.3em;
		padding: 0.1em 0.4em;
		border: none;
	}
</style>
