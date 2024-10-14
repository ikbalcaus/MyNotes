<template>
    <div class="canvas">
        <Note v-for="(note, index) in notes" :key="index"
            :id="note.id"
            :text="note.text"
            :color="note.color"
            :showButtons="hoveredNoteId == note.id"
            @mouseover="onHover(note.id);"
            @mousedown="setNoteValue(note.id); onHover(note.id)"
            @mousemove="moveNote($event)"
            @mouseup="setNoteValue(null)"
            @mouseleave="setNoteValue(null); onHoverLeave()"
            @touchstart="setNoteValue(note.id); onHover(note.id)"
            @touchmove="moveNote($event);"
            @touchend="setNoteValue(null)"
            :style="`
                position: absolute;
                top: ${note.posY}%;
                left: ${note.posX}%;
                transform: translate(-${note.posX}%, -${note.posY}%);
                z-index: ${note.zIndex};
            `"
        />
    </div>
</template>

<script setup>
    import { ref, inject } from "vue";
    
    const notes = inject("notes");
    const hoveredNoteId = ref();
    const movingNote = ref();

    const onHover = (id) => {
        hoveredNoteId.value = id;
        let movingNote = notes.value.find(note => note.id == id);
        if (movingNote) {
            let maxZIndex = notes.value.reduce((max, note) => Math.max(max, note.zIndex), 0);
            movingNote.zIndex = maxZIndex + 1;
            notes.value.sort((a, b) => a.zIndex - b.zIndex);
            notes.value.forEach((note, index) => {
                note.zIndex = index + 1;
            });
            notes.value.sort((a, b) => a.id - b.id);
            localStorage.setItem("notes", JSON.stringify(notes.value));
        }
    }

    const onHoverLeave = () => {
        hoveredNoteId.value = null;
    }

    const setNoteValue = (id) => {
        movingNote.value = notes.value.filter(note => note.id == id)[0] || null;
        if (!movingNote.value) localStorage.setItem("notes", JSON.stringify(notes.value));
    }

    const moveNote = (event) => {
        let clientX, clientY;
        if (event.type === "mousemove") {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        else if (event.type === "touchmove") {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        }
        if (movingNote.value) {
            movingNote.value.posX = clientX / window.innerWidth * 100;
            movingNote.value.posY = (clientY - 71) / (window.innerHeight - 73) * 100;
            if (movingNote.value.posX < 1) movingNote.value.posX = 0;
            else if (movingNote.value.posX > 99) movingNote.value.posX = 100;
            if (movingNote.value.posY < 1.2) movingNote.value.posY = 0.2;
            else if (movingNote.value.posY > 99) movingNote.value.posY = 100;
        }
    }
</script>

<style scoped>
    .canvas {
        position: relative;
        width: 100%;
        height: calc(100vh - 72px);
    }
</style>
