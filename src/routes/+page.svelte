<script lang="ts">
	import { quadIn, quadOut, quintInOut } from "svelte/easing";
	import { fade, fly, slide } from "svelte/transition";
	import { button } from "$lib";
	import { clsx } from "clsx";

	type Flashcard = {
		frontText: string;
		backText: string;
		status: "to-do" | "easy" | "good" | "hard" | "skipped";
	};

	const duration = 800;

	const flyLeftTransition = [200, -200];
	const flyRightTransition = [-200, 200];
	let transition = flyLeftTransition;

	let show_back = false;
	let flashcard_idx = 0;
	let flashcards: Array<Flashcard> = [
		{ frontText: "john", backText: "juan", status: "to-do" },
		{
			frontText: "hello there!",
			backText: "buenas buenaaaas",
			status: "to-do"
		},
		{
			frontText: "why cant I understand a thing?",
			backText: "porque no entiendo nada?",
			status: "to-do"
		}
	];

	function nextFlashcard() {
		transition = flyLeftTransition;
		if (flashcard_idx !== flashcards.length - 1) {
			flashcard_idx += 1;
			return;
		}
		flashcard_idx = 0;
		flashcards = flashcards
			.filter((f) => f.status !== "easy")
			.sort((a, b) => {
				if (a.status === "hard") return 0;
				if (b.status === "hard") return 1;
				if (a.status === "good") return 0;
				if (b.status === "good") return 1;
				return 0;
			});
	}

	function previousFlashcard() {
		transition = flyRightTransition;
		if (flashcard_idx === 0) return;
		flashcard_idx -= 1;
	}

	$: text = show_back
		? flashcards[flashcard_idx].backText
		: flashcards[flashcard_idx].frontText;

	// NOTE: this is for debuging purposes
	$: {
		flashcards
			.map((f) => ({ text: f.frontText, status: f.status }))
			.forEach((f) => console.log(f));
		console.log();
	}
</script>

<main class="my-8 max-w-4xl mx-auto">
	<div class="flex flex-row justify-between items-center">
		<div>
			<span class="text-emerald-800">
				{flashcards.reduce(
					(acc, f) => (f.status === "easy" ? acc + 1 : acc),
					0
				)}
			</span>
			/
			<span class="text-amber-800">
				{flashcards.reduce(
					(acc, f) => (f.status === "good" ? acc + 1 : acc),
					0
				)}
			</span>
			/
			<span class="text-red-800">
				{flashcards.reduce(
					(acc, f) => (f.status === "hard" ? acc + 1 : acc),
					0
				)}
			</span>
		</div>
		<div>{flashcard_idx + 1}/{flashcards.length}</div>
	</div>
	<div class="my-4" />
	<div class="grid grid-cols-1 grid-rows-1 text-center">
		{#key flashcard_idx}
			<div
				in:fly={{ easing: quintInOut, x: transition[0] }}
				out:fly={{ easing: quintInOut, x: transition[1] }}
				class="col-start-1 row-start-1"
			>
				<div
					class="flex justify-center items-center flex-col border-2 border-black rounded-lg p-2 h-80 text-2xl font-bold"
				>
					<div
						class={clsx(
							"grid grid-cols-1 grid-rows-1 text-center w-full h-full justify-center items-center",
							{
								"border-2 rounded-lg border-red-300":
									flashcards[flashcard_idx].status === "hard",
								"border-2 rounded-lg border-amber-300":
									flashcards[flashcard_idx].status === "good",
								"border-2 rounded-lg border-emerald-300":
									flashcards[flashcard_idx].status === "easy"
							}
						)}
					>
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

				<!-- Action buttons -->

				<div class="my-4" />
				{#if !show_back}
					<div class="flex flex-row justify-between items-center gap-2">
						<button
							class={button({ className: "w-12 h-12", format: "square" })}
							on:click={() => {
								const flashcard = flashcards[flashcard_idx];
								if (flashcard.status === "to-do") {
									flashcards[flashcard_idx].status = "skipped";
								}
								previousFlashcard();
							}}>&lt;</button
						>
						<button
							class={button({ className: "w-full col-start-1 row-start-1" })}
							on:click={() => (show_back = true)}>reveal</button
						>
						<button
							class={button({ className: "w-12 h-12", format: "square" })}
							on:click={() => {
								const flashcard = flashcards[flashcard_idx];
								if (flashcard.status === "to-do") {
									flashcards[flashcard_idx].status = "skipped";
								}
								nextFlashcard();
							}}>&gt;</button
						>
					</div>
				{:else}
					<div in:slide={{ axis: "y" }}>
						<div class="flex justify-between items-center gap-2">
							<button
								class={button({ className: "w-full", color: "success" })}
								on:click={() => {
									show_back = false;
									flashcards[flashcard_idx].status = "easy";
									nextFlashcard();
								}}
							>
								easy
							</button>
							<button
								class={button({ className: "w-full", color: "warning" })}
								on:click={() => {
									show_back = false;
									flashcards[flashcard_idx].status = "good";
									nextFlashcard();
								}}
							>
								good
							</button>
							<button
								class={button({ className: "w-full", color: "error" })}
								on:click={() => {
									show_back = false;
									flashcards[flashcard_idx].status = "hard";
									nextFlashcard();
								}}
							>
								hard
							</button>
						</div>
						<div class="my-2" />
						<p class="text-center font-bold text-xl">How did you do?</p>
					</div>
				{/if}
			</div>
		{/key}
	</div>
</main>
