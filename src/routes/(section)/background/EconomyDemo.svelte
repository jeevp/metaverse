<script>
	import { economyDemoSteps } from '../../../data/copy.json';

	let currentStep = 0;

	const nextStep = () => {
		if (currentStep === economyDemoSteps.length - 1) {
			currentStep = 0;
			blocks = [];
		} else {
			currentStep++;
		}
	};

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
		if (currentStep === 2) {
			const hash = generateUID();
			const newBlock = {
				hash: hash,
				origHash: hash,
				data: dataSamples[blocks.length],
				origData: dataSamples[blocks.length],
				valid: true
			};
			blocks = [...blocks, newBlock];
		}
		nextStep();
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

	let expanded = true;
	const toggleExpanded = () => (expanded = !expanded);
</script>

<div id="container" class="start2 end12">
	{#if expanded}
		<div class="demo-container">
			<div class="text-pane">
				<div class="step">
					<h4>{economyDemoSteps[currentStep].title}</h4>
					<p>
						{@html economyDemoSteps[currentStep].description}
					</p>
					<!-- <button on:click={nextStep}>{currentStep == steps.length - 1 ? 'Reset' : 'Next'}</button> -->
					{#if currentStep === 0}
						<button on:click={addBlock}>Start by creating a genesis block</button>
					{:else if currentStep === 1}
						<button on:click={addBlock}>Next, add another block</button>
					{:else if currentStep === 2}
						<button on:click={addBlock}>Finally, add two more blocks</button>
					{:else if currentStep === 3}
						<button on:click={nextStep}>Clear blocks and reset demo</button>
					{/if}
				</div>
			</div>

			<div class="interactive-pane">
				<div id="chain">
					{#each blocks as block, i}
						<div class="block" class:invalid={!block.valid}>
							<div class="block-name">
								{#if i == 0}
									G
								{:else}
									{i}
								{/if}
							</div>

							<div class="data">
								<label for="blockData"> Block data </label>
								<input
									name="blockData"
									bind:value={block.data}
									type="text"
									on:input={() => onDataChange(i)}
								/>
							</div>
							<div class="header">
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
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- <div class="step">
		<p>
			A blockchain is a list of blocks. Each block records transactions (data) and also stores the
			transactions of previous blocks. These records are immutable, meaning any data entered is
			irreversible.
		</p>
	</div>
	<div class="step">
		<ol>
			<li>
				To begin, create a genesis block. Notice the unique hash associated with the block's data
				(the message "Hello world...").
			</li>
			<li>
				Next, add another block. This block has its own hash, but also stores the hash of the
				previous block. Now, try editing the block's message and notice how the hash changes.
			</li>
			<li>
				Add two more blocks and try editing their messages. Editing a block's data after its
				creation will affect all the blocks that depend on it (the ones further down the chain).
			</li>
		</ol>
	</div> -->
	{/if}
</div>

<style>
	#container {
		padding: 1em;
		margin: 2em 0;
		--bg-color: var(--light);
		--text-color: var(--dark);
		/* background-color: #2d3145; */
		background-color: #e8ebea;
	}

	.demo-container {
		display: flex;
	}

	.text-pane {
		flex: 1;
		position: relative;
	}

	.interactive-pane {
		flex: 1;
		background-color: #ffffffba;
		padding: 1em;
	}

	.text-pane button {
		background-color: #d8b4e8;
		border: none;
		font-size: 0.8em;
		font-weight: 600;
		padding: 0.25em 0.5em;
		border-radius: 0.2em;
		position: absolute;
		bottom: 0;
	}

	p {
		font-size: 1.1rem;
		width: 80%;
		margin: 1em 0 3em 0;
		flex: 1;
	}

	#chain {
		width: 100%;
		font-family: 'league mono narrow';
	}

	.block {
		color: #e5e0f0;
		margin: auto;
		border-radius: 4px;
		width: 100%;
		margin-top: 20px;
		font-size: 1rem;
		font-weight: 600;
		display: flex;
	}
	.block:first-child {
		margin-top: 0;
	}

	.block input {
		background: #00000045;
		color: #e5e3e3;
		border: 2px solid #ffffff61;
		padding: 0.4em;
		border-radius: 0.2em;
		margin: 0.3em 0;
		width: calc(100% - 0.5em);
		font-weight: 400;
	}

	.header,
	.data {
		flex: 1;
		padding: 0.5em;
	}

	.header {
		flex: 1;
		background: #190748;
	}

	.data {
		background: #4918c3;
	}

	.block .block-name {
		font-weight: 900;
		text-transform: uppercase;
		font-size: 1.4em;
		width: 1.4em;
		height: 1.4em;
		background-color: #c43e9b;
		color: black;
		text-align: center;
	}

	.block .hash-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-weight: 400;
		margin-bottom: 0.5em;
		clear: both;
	}

	.block .hash {
		text-transform: uppercase;
		background-color: #d5ecd2;
		/* border: 2px solid #2b8c32; */
		color: #0e4912;
		padding: 0em 0.3em;
		border-radius: 0.3em;
		font-weight: 600;
		font-size: 0.9em;
	}

	.block .hash.invalid {
		/* border-color: #a91717; */
		background-color: #ffcaca;
		color: #7a0909;
	}
</style>
