<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import 'chartjs-adapter-moment';

	import { rawData } from '../data/trendsData';

	const dates = rawData.map((r) => Date.parse(r.Date));
	export const data = {
		labels: dates,
		datasets: [
			{
				label: '"metaverse"',
				backgroundColor: 'brown',
				borderColor: 'brown',
				data: rawData.map((r) => r.Popularity)
			},
			{
				label: '"web3"',
				backgroundColor: 'green',
				borderColor: 'green',
				data: rawData.map((r) => r.Popularity - 6)
			}
		]
	};

	let ctx;
	let chartCanvas;

	const config = {
		type: 'line',
		data: data,
		options: {
			spanGaps: true,
			tension: 0.4,
			plugins: {
				legend: {
					position: 'chartArea',
					align: 'start',
					labels: {
						boxHeight: 1,
						boxWidth: 20,
						padding: 15,
						useBorderRadius: true,
						borderRadius: 0.5,
						font: {
							size: 14
						}
					}
				}
			},
			elements: {
				point: {
					radius: 0
				}
			},
			scales: {
				x: {
					type: 'time',
					time: {
						unit: 'year'
					}
				}
			}
		}
	};
	onMount(async () => {
		ctx = chartCanvas.getContext('2d');
		Chart.defaults.font.family = 'Iosevka Extended';
		Chart.defaults.font.size = 16;
		let c = new Chart(ctx, config);
	});
</script>

<div>
	<canvas bind:this={chartCanvas} />
</div>

<style>
	div {
		background-color: var(--light);
	}
</style>
