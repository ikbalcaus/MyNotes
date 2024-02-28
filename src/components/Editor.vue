<template>
    <div class="editor">
        <Textarea v-model="text" @input="dataChanged" class="textarea" placeholder="Type here..." autoResize spellcheck="false" />
        <Dropdown v-model="selectedColor" @change="dataChanged" class="dropdown" :options="colors" placeholder="Select a Color" :highlightOnSelect="false" />
        <Button @click="saveChanges">{{ btnText }}</Button>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';

    const colors = [ "green", "blue", "red", "yellow", "orange", "purple", "pink", "cyan", "teal", "gray" ];
    const props = defineProps({
        text: String,
        color: String,
        btnText: String
    });
    const text = ref();
    const selectedColor = ref();
    const emits = defineEmits(["sendParameters", "btnClick"]);


    const dataChanged = () => {
        emits("sendParameters", text.value, selectedColor.value);
    };

    const saveChanges = () => {
        emits("btnClick");
    };

    onMounted(() => {
        text.value = props.text;
        selectedColor.value = props.color || "green";
    })
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
