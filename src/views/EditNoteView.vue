<template>
	<Splitter class="splitter" :layout="layout">
		<SplitterPanel :size="50" :minSize="10">
			<Editor class="editor" btn-text="Edit note"
				:text="text"
				:color="selectedColor"
				@sendParameters="applyParameters"
				@btnClick="editNote"
			/>
		</SplitterPanel>
		<SplitterPanel :size="50" :minSize="10"> 
			<Note class="note"
				:text="text"
				:color="selectedColor"
				:enable-buttons="false"
			/>
		</SplitterPanel>
	</Splitter>
</template>

<script setup>
	import { inject, onMounted, onUnmounted, ref } from "vue";
	import { useRouter } from "vue-router";

	const router = useRouter();
	const layout = ref();
	const notes = inject("notes");
	const currentNote = notes.value.filter(note => note.id == router.currentRoute.value.params.id)[0]
	const text = ref(currentNote.text);
	const selectedColor = ref(currentNote.color);

	const applyParameters = (newText, newSelectedColor) => {
		text.value = newText;
		selectedColor.value = newSelectedColor;
	}

	const editNote = () => {
		currentNote.text = text.value;
		currentNote.color = selectedColor.value;
		localStorage.setItem("notes", JSON.stringify(notes.value));
		router.push("/");
	}

	const checkSize = () => { layout.value = (window.innerWidth <= 767) ? "vertical" : "horizontal"; }
	onMounted(() => {
		checkSize();
		window.addEventListener("resize", checkSize);
	});
	onUnmounted(() => {
		window.removeEventListener("resize", checkSize);
	});
</script>

<style scoped>
	.splitter {
		width: 100%;
		height: calc(100vh - 73px);
		border: none;
	}
	.editor {
		position: relative;
		top: 45%;
		transform: translateY(-50%);
		margin: 0 auto;
	}
	.note {
		position: relative;
		left: 50%;
		top: 45%;
		transform: translate(-50%, -50%);
	}

	@media (max-width: 767px) {
		.editor, .note {
			top: 50%;
		}
	}
</style>
