<template>
    <div class="canvas">
        <Note v-for="(note, index) in notes" :key="index"
            :id="note.id"
            :text="note.text"
            :color="note.color"
            :enableButtons="true"
            @mouseover="riseLayer(note.id)"
            @mousedown="setNoteValue(note.id)"
            @mousemove="moveNote($event)"
            @mouseup="setNoteValue(null)"
            @mouseleave="setNoteValue(null)"
            :style="`
                position: absolute;
                top: ${note.posY}%;
                left: ${note.posX}%;
                transform: translate(-${note.posX}%, -${note.posY}%);
                z-index: ${note.zIndex};
        `" />
    </div>
</template>

<script setup>
    import { ref, inject } from 'vue';
    const notes = inject("notes");
    const currentNote = ref();

    const riseLayer = (id) => {
        let currentNote = notes.value.filter(note => note.id == id)[0];
        let maxZIndex = notes.value.reduce((max, note) => Math.max(max, note.zIndex), 1) + 1;
        currentNote.zIndex = maxZIndex;
        localStorage.setItem("notes", JSON.stringify(notes.value));
    }

    const setNoteValue = (id) => {
        currentNote.value = notes.value.filter(note => note.id == id)[0] || null;
        if(!currentNote.value) localStorage.setItem("notes", JSON.stringify(notes.value));
    }

    const moveNote = (event) => {
        if(currentNote.value) {
            currentNote.value.posX = event.clientX / window.innerWidth * 100;
            currentNote.value.posY = (event.clientY - 71) / (window.innerHeight - 73) * 100;
            if(currentNote.value.posX < 1) currentNote.value.posX = 0;
            else if(currentNote.value.posX > 99) currentNote.value.posX = 100;
            if(currentNote.value.posY < 1.2) currentNote.value.posY = 0.2;
            else if(currentNote.value.posY > 99) currentNote.value.posY = 100;
        }
    }
</script>

<style scoped>
    .canvas {
        position: relative;
        width: 100%;
        height: calc(100vh - 73px);
    }
</style>
