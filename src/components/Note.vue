<template>
    <div class="note" :style="`backgroundColor: var(--${color}-500)`">
        <div v-if="showButtons" class="buttons">
            <Button icon="pi pi-file-edit" class="note-btn" text @click="editNote()" />
            <Button icon="pi pi-times" class="note-btn" text @click="deleteNote()" />
        </div>
        <div class="text">
            <p>{{ text }}</p>
        </div>
    </div>
</template>

<script setup>
    import { inject } from "vue";
    import { useRouter } from "vue-router";

    const router = useRouter();
    const notes = inject("notes");
    const props = defineProps({
        id: Number,
        text: String,
        color: String,
        showButtons: Boolean
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
