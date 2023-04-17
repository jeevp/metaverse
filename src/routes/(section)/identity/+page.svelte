<script>
	import PartHeading from '../PartHeading.svelte';
	import SectionHeading from '../SectionHeading.svelte';
	import copy from '../../../data/copy.json';
	import Paragraph from '../Paragraph.svelte';
	import Blotter from '../Blotter.svelte';
	import Figure from '../Figure.svelte';
	import IDCard from './IDCard.svelte';
	import PageIntro from '../PageIntro.svelte';
</script>

<section class="grid-wrapper page">
	<PageIntro />
	<!-- <Blotter /> -->

	<PartHeading number="4" title="Identity" />

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
			caption=""
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
	<Paragraph words={copy.harassment} classProp="start3 end8" />
</section>

<style>
	/* section {
		background-color: var(--dark);
		--bg-color: var(--dark);
		--text-color: var(--light);
	} */
</style>
