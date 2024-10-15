<template>
	<Splitter class="splitter" :layout="layout" @touchmove="preventDefault">
		<SplitterPanel :size="50" :minSize="10">
			<Editor class="editor" btn-text="Edit note"
				:text="text"
				:color="selectedColor"
				@sendParameters="applyParameters"
				@btnClick="router.currentRoute.value.path == '/new' ? addNote() : editNote()"
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
	import { ref, inject, onMounted, onUnmounted } from "vue";
	import { useRouter } from "vue-router";

	const router = useRouter();
	const layout = ref();
	const notes = inject("notes");
	const currentNote = notes.value.filter(note => note.id == router.currentRoute.value.params.id)[0];
	const text = ref(currentNote ? currentNote.text : "");
	const selectedColor = ref(currentNote ? currentNote.color : "green");

	const applyParameters = (newText, newSelectedColor) => {
		text.value = newText;
		selectedColor.value = newSelectedColor;
	}

	const addNote = () => {
		notes.value.push({
			id: (notes.value.length > 0) ? (notes.value[notes.value.length - 1].id + 1) : 1,
			text: text.value,
			color: selectedColor.value,
			posX: Math.random() * 100,
			posY: Math.random() * 100,
			zIndex: notes.value.reduce((max, note) => Math.max(max, note.zIndex), 0) + 1
		});
		localStorage.setItem("notes", JSON.stringify(notes.value));
		router.push("/");
	}

	const editNote = () => {
		currentNote.text = text.value;
		currentNote.color = selectedColor.value;
		localStorage.setItem("notes", JSON.stringify(notes.value));
		router.push("/");
	}

	const preventDefault = (event) => {
		event.preventDefault();
	};

	const checkSize = () => {
		layout.value = (window.innerWidth <= 767) ? "vertical" : "horizontal";
	}

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
		height: calc(100vh - 72px);
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
