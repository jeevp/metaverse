<script>
	import './styles.css';
	import '@fontsource/newsreader/variable.css';
	import '@fontsource/league-mono';
	import '@fontsource/league-mono-narrow';

	import { page } from '$app/stores';

	const capitalize = (s) => s && s[0].toUpperCase() + s.slice(1);

	const appName = 'Metaverse';
	$: title = [appName, ...$page.url.pathname.split('/').slice(1)]
		.filter(Boolean)
		.map((x) => capitalize(x))
		.join(' | ');
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<slot />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@30,400&display=swap');
</style>
