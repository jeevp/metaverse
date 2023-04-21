<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import 'chartjs-adapter-moment';

	import { rawData } from '../../../data/trendsData';

	const dates = rawData.map((r) => Date.parse(r.Date));
	export const data = {
		labels: dates,
		datasets: [
			{
				label: '"metaverse"',
				backgroundColor: 'black',
				borderColor: 'black',
				data: rawData.map((r) => r.Popularity)
			}
			// {
			// 	label: '"web3"',
			// 	backgroundColor: 'green',
			// 	borderColor: 'green',
			// 	data: rawData.map((r) => r.Popularity - 6)
			// }
		]
	};

	let ctx;
	let chartCanvas;

	const config = {
		type: 'line',
		data: data,
		options: {
			animation: {
				delay: 1000
			},
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
		Chart.defaults.font.family = 'League Mono Narrow';
		Chart.defaults.font.size = 16;
		let c = new Chart(ctx, config);
	});
</script>

<figure>
	<canvas bind:this={chartCanvas} />
	<figcaption>
		<strong>Google search trends for the term "metaverse" by relative popularity.</strong>
		Interest in the metaverse skyrocketed after Meta's rebranding. In fact, the term "metaverse” was
		the runner-up for Oxford Language's Word of the Year in 2022.
	</figcaption>
</figure>

<style>
	figure {
		background-color: var(--light);
		padding-top: 4em;
	}
	figcaption {
		/* font-family: 'league mono narrow'; */
		/* text-align: center; */
		font-size: 0.95rem;
		margin: 1em;
		margin-top: 2em;
	}
</style>
