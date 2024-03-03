<template>
	<Splitter class="splitter" :layout="layout">
		<SplitterPanel :size="55" :minSize="10">
			<Editor class="editor" btn-text="Add note" @sendParameters="applyParameters" @btnClick="addNote" />
		</SplitterPanel>
		<SplitterPanel :size="45" :minSize="10"> 
			<Note class="note" :text="text" :color="selectedColor" :enable-buttons="false" />
		</SplitterPanel>
	</Splitter>
</template>

<script setup>
	import { inject, onMounted, onUnmounted, ref } from 'vue';
	import { useRouter } from 'vue-router';

	const router = useRouter();
	const layout = ref();
	const notes = inject("notes");
	const text = ref();
	const selectedColor = ref("green");

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
		z-index: v-bind(zIndex);
	}

	@media (max-width: 767px) {
		.editor, .note {
			top: 50%;
		}
	}
</style>
