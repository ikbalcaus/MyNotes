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
        `" />
    </div>
</template>
    
<script setup>
    import { inject } from 'vue';

    const notes = inject("notes");

    const riseLayer = (id) => {
        
    }
</script>

<style scoped>
    .canvas {
        position: relative;
        width: 100%;
        height: calc(100vh - 73px);
    }
</style>