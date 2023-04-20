<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let materialType;
	export let inputText;
	let element;

	if (browser) {
		onMount(() => {
			console.log('LOAD TEXT for', inputText);
			document.fonts.ready.then(function () {
				var text = new Blotter.Text(inputText.toUpperCase(), {
					family: 'League Mono',
					size: 150,
					weight: 800,
					fill: '#E0EBDB'
				});

				let material;
				switch (materialType) {
					case 'liquid':
						material = new Blotter.LiquidDistortMaterial();
						material.uniforms.uVolatility.value = 0.04;
						material.uniforms.uSpeed.value = 0.15;
						break;
					case 'flies':
						material = new Blotter.FliesMaterial();
						console.log(material.uniforms);
						material.uniforms.uPointCellWidth.value = 0.02;
						material.uniforms.uPointRadius.value = 0.6;
						material.uniforms.uSpeed.value = 2;
						// material.uniforms.uDodge.value = 1;
						break;
					case 'split':
						material = new Blotter.ChannelSplitMaterial();
						material.uniforms.uOffset.value = 0.05;
						material.uniforms.uRotation.value = 10;
						material.uniforms.uApplyBlur.value = 1;
						material.uniforms.uAnimateNoise.value = 0.3;

						const refreshRate = 1000 / 60;
						const maxXPosition = 400;
						let speedX = 0.05;
						let positionX = 0;

						function step() {
							positionX += 0.01;

							if (material.uniforms.uOffset.value >= 0.2) {
								positionX *= -1;
							}

							material.uniforms.uOffset.value += positionX / 10000;
							// material.uniforms.uRotation.value += 0.5;

							window.requestAnimationFrame(step);
						}

						window.requestAnimationFrame(step);

					default:
						break;
				}

				// material.uniforms.uOffset.value = 0.05;
				// material.uniforms.uRotation.value = 50;
				// material.uniforms.uApplyBlur.value = 1;
				// material.uniforms.uAnimateNoise.value = 0.3;

				var blotter = new Blotter(material, {
					texts: text
				});

				var scope = blotter.forText(text);

				scope.appendTo(element);

				// document.onmousemove = moveIt;

				function moveIt(event) {
					switch (materialType) {
						case 'liquid':
							material.uniforms.uVolatility.value = event.clientX * 0.00009;
							break;
						case 'split':
							material.uniforms.uRotation.value = event.clientX * 0.2;
							material.uniforms.uOffset.value = event.clientY * 0.0002;
							break;
						default:
							break;
					}
				}
			});
		});
	}
</script>

<div class="text start2 end10" bind:this={element} />

<style>
	.text {
		/* border: 2px solid; */
		/* background-color: green; */
	}
</style>
