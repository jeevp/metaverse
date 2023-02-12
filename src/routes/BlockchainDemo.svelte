<script>
	const generateUID = () => {
		var firstPart = (Math.random() * 46656) | 0;
		var secondPart = (Math.random() * 46656) | 0;
		firstPart = ('000' + firstPart.toString(36)).slice(-3);
		secondPart = ('000' + secondPart.toString(36)).slice(-3);
		return firstPart + secondPart;
	};

	let blocks = [];
	let dataSamples = ['Hello world...', 'Another block', 'Number three!', 'Block number 4!'];

	const addBlock = () => {
		const hash = generateUID();
		const newBlock = {
			hash: hash,
			origHash: hash,
			data: dataSamples[blocks.length],
			origData: dataSamples[blocks.length],
			valid: true
		};
		blocks = [...blocks, newBlock];
	};

	const onDataChange = (i) => {
		if (blocks[i].data == blocks[i].origData) {
			blocks[i].hash = blocks[i].origHash;
			for (let index = i; index < blocks.length; index++) {
				blocks[index].hash = blocks[index].origHash;
			}
		} else {
			blocks[i].hash = generateUID();
			for (let index = i; index < blocks.length; index++) {
				blocks[index].hash = generateUID();
			}
		}
	};
</script>

<div id="container">
	<button on:click={addBlock}>
		{#if blocks.length == 0}
			Create a genesis block
		{:else}
			Add another block
		{/if}
	</button>
	<div id="chain">
		{#each blocks as block, i}
			<div class="block" class:invalid={!block.valid}>
				<div class="block-name">
					{#if i == 0}
						Genesis block
					{:else}
						Block #{i}
					{/if}
				</div>
				<label for="blockData">Block data</label>
				<input
					autofocus
					name="blockData"
					bind:value={block.data}
					type="text"
					on:input={() => onDataChange(i)}
				/>
				<div class="hash-row">
					Block hash <span class="hash" class:invalid={block.hash !== block.origHash}>
						{block.hash}
					</span>
				</div>
				{#if i > 0}
					<div class="hash-row">
						Previous block hash <span
							class="hash"
							class:invalid={blocks[i - 1].hash !== blocks[i - 1].origHash}
						>
							{blocks[i - 1].hash}
						</span>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
	#container {
		grid-column: 1 / -1;
		margin: auto;
		padding-top: 40px;
		width: 100%;
		font-family: var(--ui-font);
	}

	#chain {
		display: flex;
		margin-top: 1em;
		width: 100%;
	}

	.block {
		background-color: white;
		border: 2px solid #d9d6d6;
		border-radius: 4px;
		padding: 1em;
		width: 250px;
		margin-left: 20px;
		font-size: 0.9em;
		font-weight: 600;
	}
	.block:first-child {
		margin-left: 0;
	}

	.block label {
		display: block;
		margin-top: 1em;
		margin-bottom: 0.25em;
		font-size: 0.85em;
		font-weight: 700;
	}

	.block input {
		display: block;
		background: #eae7e7;
		color: inherit;
		border: none;
		padding: 0.4em;
		width: 100%;
		border-radius: 0.3em;
		margin-bottom: 1em;
	}

	.block .block-name {
		font-weight: 900;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		font-size: 0.8em;
	}

	.block .hash-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 0.85em;
		font-weight: 700;
		margin: 0.5em 0;
	}

	.block .hash {
		text-transform: uppercase;
		background-color: #d5ecd2;
		border: 2px solid #2b8c32;
		color: #0e4912;
		padding: 0em 0.3em;
		border-radius: 0.3em;
		font-weight: 800;
		font-size: 0.9em;
	}

	.block .hash.invalid {
		border-color: #a91717;
		background-color: #ffcaca;
		color: #7a0909;
	}
</style>
