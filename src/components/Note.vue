<template>
    <div class="note" :style="`backgroundColor: var(--${color}-500)`" @mouseover="showButtons=true" @mouseleave="showButtons=false">
        <div v-if="enableButtons && showButtons" class="buttons">
            <Button icon="pi pi-file-edit" @click="editNote()" class="note-btn" text />
            <Button icon="pi pi-times" @click="deleteNote()" class="note-btn" text />
        </div>
        <div class="text">
            <p>{{ text }}</p>
        </div>
    </div>
</template>

<script setup>
    import { inject, ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const notes = inject("notes");
    const showButtons = ref();
    const props = defineProps({
        id: Number,
        text: String,
        color: String,
        enableButtons: Boolean
    });

    const editNote = () => {
        router.push("/edit/" + props.id);
    }

    const deleteNote = () => {
        notes.value = notes.value.filter(note => note.id != props.id);
        localStorage.setItem("notes", JSON.stringify(notes.value));
    }
</script>

<style scoped>
    .note {
        width: 310px;
        height: 310px;
        border-radius: 2px;
        cursor: default;
        position: relative;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
    }
    .buttons {
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .note-btn {
        width: 30px;
        height: 30px;
        color: var(--primary-color-text);
        opacity: 0.7;
    }
    .note-btn:active {
        background-color: transparent;
    }
    .text {
        padding: 1px 20px;
        height: 290px;
        overflow: hidden;
        word-wrap: break-word;
        white-space: pre-wrap;
        font-size: 18px;
        color: var(--primary-color-text);
        user-select: none;
    }
</style>
