<template>
    <div class="editor">
        <Textarea v-model="text" class="textarea" placeholder="Type here..." autoResize spellcheck="false"
            @input="data"
        />
        <Dropdown v-model="selectedColor" class="dropdown" placeholder="Select a Color" :highlightOnSelect="false"
            :options="colors"
            @change="data"
        />
        <Button @click="saveChanges">{{ btnText }}</Button>
    </div>
</template>

<script setup>
    import { ref } from "vue";

    const props = defineProps({
        text: String,
        color: String,
        btnText: String
    });
    const emits = defineEmits(["sendParameters", "btnClick"]);
    const colors = [ "green", "blue", "red", "yellow", "orange", "purple", "pink", "cyan", "teal", "gray" ];
    const text = ref(props.text);
    const selectedColor = ref(props.color || "green");

    const data = () => {
        emits("sendParameters", text.value, selectedColor.value);
    }

    const saveChanges = () => {
        emits("btnClick");
    }
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
