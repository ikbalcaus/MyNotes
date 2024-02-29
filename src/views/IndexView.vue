<template>
    <div class="canvas">
        <Note v-for="(note, index) in notes" :key="index"
            :id="note.id"
            :text="note.text"
            :color="note.color"
            :enableButtons="true"
            @mouseover="riseLayer(note.id)"
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
    import { inject } from 'vue';

    const notes = inject("notes");

    const riseLayer = (id) => {
        let currentNote = notes.value.filter(note => note.id == id)[0];
        let maxZIndex = notes.value.reduce((max, note) => Math.max(max, note.zIndex), 1) + 1;
        currentNote.zIndex = maxZIndex;
        localStorage.setItem("notes", JSON.stringify(notes.value));
    }
</script>

<style scoped>
    .canvas {
        position: relative;
        width: 100%;
        height: calc(100vh - 73px);
    }
</style>