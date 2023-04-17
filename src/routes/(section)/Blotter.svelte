<script>
	$: loaded = false;

	const ready = () => {
		loaded = true;
		initBlotter();
	};

	const initBlotter = () => {
		if (loaded === false) return;

		var text = new Blotter.Text('Identity', {
			// family: 'standard',
			size: 150,
			weight: 600
		});

		var material = new Blotter.LiquidDistortMaterial();
		material.uniforms.uVolatility.value = 0.1;
		material.uniforms.uSpeed.value = 0.3;
		// material.uniforms.uOffset.value = 0.05;
		// material.uniforms.uRotation.value = 50;
		// material.uniforms.uApplyBlur.value = 1;
		// material.uniforms.uAnimateNoise.value = 0.3;

		let element = document.querySelector('.text');

		var blotter = new Blotter(material, {
			texts: text
		});

		var scope = blotter.forText(text);

		scope.appendTo(element);

		document.onmousemove = moveIt;

		function moveIt(event) {
			// console.log(event.clientX);
			material.uniforms.uVolatility.value = event.clientX * 0.00009;
		}

		return material;
	};
</script>

<svelte:head>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Blotter/0.1.0/blotter.min.js"></script>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/Blotter/0.1.0/materials/liquidDistortMaterial.min.js"
		on:load={ready()}
	></script>
</svelte:head>

<div class="text start2 end10" />

<style>
	.text {
		border: 2px solid;
	}
</style>
