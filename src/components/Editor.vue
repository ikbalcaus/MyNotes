<template>
    <div class="editor">
        <Textarea v-model="text" @input="dataChanged" class="textarea" placeholder="Type here..." autoResize spellcheck="false" />
        <Dropdown v-model="selectedColor" @change="dataChanged" class="dropdown" :options="colors" placeholder="Select a Color" :highlightOnSelect="false" />
        <Button @click="saveChanges">{{ btnText }}</Button>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const text = ref("");
    const selectedColor = ref("green");
    const colors = [ "green", "blue", "red", "yellow", "orange", "purple", "pink", "cyan", "teal", "gray" ];
    const props = defineProps({ btnText: String });
    const emits = defineEmits(["sendParameters", "btnClick"]);

    const dataChanged = () => {
        emits("sendParameters", text.value, selectedColor.value);
    };

    const saveChanges = () => {
        emits("btnClick");
    };
</script>

<style scoped>
    .editor {
        display: flex;
        flex-direction: column;
        gap: 10px;
        width: 310px;
    }
    .textarea {
        height: 290px !important;
    }
    .dropdown {
        flex-direction: row;
    }
</style>
