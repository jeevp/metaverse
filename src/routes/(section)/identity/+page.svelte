<script>
	import PartHeading from '../PartHeading.svelte';
	import SectionHeading from '../SectionHeading.svelte';
	import copy from '../../../data/copy.json';
	import Paragraph from '../Paragraph.svelte';
	import Figure from '../Figure.svelte';
	import IDCard from './IDCard.svelte';
	import PageIntro from '../PageIntro.svelte';
	import BigTitle from '../BigTitle.svelte';
</script>

<PageIntro bg="bold-blue">
	<BigTitle section="identity" />
</PageIntro>
<section class="grid-wrapper page">
	<!-- <Blotter materialType="liquid" inputText="Reality" /> -->

	<PartHeading number="1" title="Identity" />

	<SectionHeading hook={copy.identityHook} byline={copy.identityByline} />
	<Paragraph
		words={copy.avatarIntro}
		classProp="start2 end7"
		heading="Avatars and digital identities"
	/>
	<Paragraph words={copy.avatarCustomization} classProp="start7 end12" />
	<IDCard />
	<Paragraph words={copy.customizationBenefits} classProp="start3 end8" />
	<div class="start9 end12">
		<Figure
			source="./dog.png"
			alt="Cartoon in which a dog says 'On the Internet, nobody knows you're a dog'"
			caption="1993 cartoon published in <i>The New Yorker</i>"
			height="350"
			overflow
		/>
	</div>
	<Paragraph
		words={copy.identityRebuttal}
		classProp="start3 end8"
		heading="Identity tourism in cyberspace"
	/>
	<Paragraph words={copy.identityTourism} classProp="start3 end8" />

	<Paragraph
		words={copy.identityIssues}
		classProp="start3 end8"
		heading="Real-world issues in virtual spaces"
	/>
	<div class="start9 end12">
		<Figure
			source="./avatars.png"
			alt="Four pixelated avatars designed to represent people with distinct appearances"
			caption={`Avatars from a collection 10000 "VeKings" NFTs`}
			height="350"
			overflow
		/>
	</div>
	<Paragraph words={copy.harassment} classProp="start3 end8" />
</section>

<style>
	section {
		--bg-color: var(--pale-blue);
		background-color: var(--bg-color);
		--text-color: var(--dark);
		color: var(--text-color);
	}
</style>
