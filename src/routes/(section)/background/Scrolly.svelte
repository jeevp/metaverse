<script>
	/**
	 * This component manages which item is most in view for scroll triggering
	 * example:
	 * <Scrolly
	 * 	bind:value={scrollIndex}
	 * >
	 * **items here**
	 * </Scrolly>
	 *
	 * optional params with defaults
	 * <Scrolly root={null} top={0} bottom={0} increments={100}>
	 */
	import { onMount } from 'svelte';
	export let root = null;
	export let top = 0;
	export let bottom = 400;
	export let increments = 100;
	export let value = undefined;
	// export let progress = undefined;

	export let steps = [];
	const threshold = [];

	let nodes = [];
	let intersectionObservers = [];
	let container;

	$: top, bottom, update();

	const update = () => {
		if (!nodes.length) return;
		nodes.forEach(createObserver);
	};

	const mostInView = () => {
		let maxRatio = 0;
		let maxIndex = 0;
		for (let i = 0; i < steps.length; i++) {
			if (steps[i] > 0.2) {
				maxRatio = steps[i];
				maxIndex = i;
			}
		}
		if (maxRatio > 0) value = maxIndex;
		else value = -1;
	};

	const createObserver = (node, index) => {
		const handleIntersect = (e) => {
			const intersecting = e[0].isIntersecting;
			const ratio = e[0].intersectionRatio;
			// progress = (e[0].boundingClientRect.height / e[0].boundingClientRect.bottom) * 100;
			steps[index] = ratio;
			mostInView();
		};

		const marginTop = top ? top * -1 : 0;
		const marginBottom = bottom ? bottom * -1 : 0;
		const rootMargin = `${marginTop}px 0px ${marginBottom}px 0px`;
		const options = { root, rootMargin, threshold };

		if (intersectionObservers[index]) intersectionObservers[index].disconnect();

		const io = new IntersectionObserver(handleIntersect, options);
		io.observe(node);
		intersectionObservers[index] = io;
	};

	onMount(() => {
		for (let i = 0; i < increments + 1; i++) {
			threshold.push(i / increments);
		}
		nodes = container.querySelectorAll(':scope > *');
		update();
	});
</script>

<div bind:this={container}>
	<slot />
</div>
