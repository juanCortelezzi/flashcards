<script lang="ts">
	const arr = [
		['john', 'juan'],
		['hello there!', 'buenas buenaaaas'],
		['why cant I understand a thing?', 'porque no entiendo nada?']
	];
</script>

<main class="min-h-screen flex justify-center items-center flex-col">
	<ul>
		{#each arr as [english, spanish]}
			<li>item: {english} - {spanish}</li>
		{/each}
	</ul>
	<button
		class="border-2 border-black rounded-md px-4 py-2 hover:bg-black hover:text-white transition-colors ease-in-out"
		>hello there</button
	>
</main>
