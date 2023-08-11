<script lang="ts">
	import { quadIn, quadOut, quintInOut } from 'svelte/easing';
	import { fade, fly, blur } from 'svelte/transition';
	import { tv } from 'tailwind-variants';

	const button = tv({
		base: 'border-2 border-black rounded-lg px-4 py-2 hover:bg-black hover:text-white transition-colors ease-in-out font-bold capitalize duration-100',
		variants: {
			color: {
				error: 'border-red-800 text-red-800 hover:bg-red-800 hover:text-white',
				success: 'border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-white',
				warning: 'border-amber-800 text-amber-800 hover:bg-amber-800 hover:text-white'
			}
		}
	});

	const duration = 800;
	let revealed = false;
	let index = 0;
	const arr = [
		['john', 'juan'],
		['hello there!', 'buenas buenaaaas'],
		['why cant I understand a thing?', 'porque no entiendo nada?']
	];

	function incrementIndex() {
		revealed = false;
		if (index === arr.length - 1) {
			index = 0;
			return;
		}
		index += 1;
	}

	function reveal() {
		revealed = true;
	}

	$: text = revealed ? arr[index][1] : arr[index][0];
</script>

<main class="my-8 max-w-4xl mx-auto">
	<div class="text-end">{index + 1}/{arr.length}</div>
	<div class="my-4" />
	<div class="grid grid-cols-1 grid-rows-1 text-center">
		{#key index}
			<div
				in:fly={{ easing: quintInOut, x: 200 }}
				out:fly={{ easing: quintInOut, x: -200 }}
				class="col-start-1 row-start-1"
			>
				<div
					class="flex justify-center items-center flex-col border-2 border-black rounded-lg p-4 h-80 text-2xl font-bold"
				>
					<div class="grid grid-cols-1 grid-rows-1 text-center">
						{#key text}
							<span
								in:fade={{ easing: quadIn, duration }}
								out:fade={{ easing: quadOut, duration }}
								class="col-start-1 row-start-1"
							>
								{text}
							</span>
						{/key}
					</div>
				</div>
				<div class="my-4" />
				<div class="grid grid-cols-1 grid-rows-1 text-center items-start justify-start">
					{#if !revealed}
						<button
							class={button({ className: 'w-full col-start-1 row-start-1' })}
							on:click={reveal}
							out:blur={{}}>reveal</button
						>
					{:else}
						<div in:blur={{}} class="col-start-1 row-start-1">
							<div class="flex justify-between items-center gap-2">
								<button
									class={button({ className: 'w-full', color: 'success' })}
									on:click={incrementIndex}
								>
									easy
								</button>
								<button
									class={button({ className: 'w-full', color: 'warning' })}
									on:click={incrementIndex}
								>
									good
								</button>
								<button
									class={button({ className: 'w-full', color: 'error' })}
									on:click={incrementIndex}
								>
									hard
								</button>
							</div>
							<div class="my-2" />
							<p class="text-center font-bold text-xl">How did you do?</p>
						</div>
					{/if}
				</div>
			</div>
		{/key}
	</div>
</main>
