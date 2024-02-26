<template>
    <div class="canvas">
        <Note v-for="note in notes"
            :text="note.text"
            :color="note.color"
        :style="`
            position: absolute;
            top: ${note.posY}%;
            left: ${note.posX}%;
            transform: translate(-${note.posX}%, -${note.posY}%);
        `" />
    </div>
</template>
    
<script setup>
    import { ref } from 'vue';

    const notes = ref(JSON.parse(localStorage.getItem("notes")) || []);
</script>

<style scoped>
    .canvas {
        position: relative;
        width: 100%;
        height: calc(100vh - 73px);
    }
</style>