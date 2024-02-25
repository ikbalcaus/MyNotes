<template>
    <div class="note" :style="{ backgroundColor: 'var(--' + color + '-500)' }">
        <div class="text">
            <p>{{ text }}</p>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        text: String,
        color: String
    });
</script>

<style scoped>
    .note {
        width: 310px;
        height: 310px;
        border-radius: 2px;
        cursor: default;
    }
    .text {
        padding: 1px 20px;
        height: 290px;
        overflow: hidden;
        word-wrap: break-word;
        white-space: pre-wrap;
        font-size: 18px;
        color: var(--primary-color-text);
    }
</style>
