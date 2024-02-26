<template>
    <div>
        <Textarea v-model="text" @input="sendParameters" class="textarea" placeholder="Type here..." autoResize spellcheck="false" />
        <Dropdown v-model="selectedColor" @change="sendParameters" class="dropdown" :options="colors" placeholder="Select a Color" :highlightOnSelect="false" />
        <Button @click="saveChanges">{{ btnText }}</Button>
    </div>
</template>

<script setup>
    import { defineProps, defineEmits, ref } from 'vue';

    const text = ref("");
    const selectedColor = ref("green");
    const colors = [ "green", "blue", "yellow", "red", "cyan", "pink", "teal", "orange", "purple", "gray" ];
    const props = defineProps({ btnText: String });
    const emits = defineEmits(["parameters", "btnClick"]);

    const sendParameters = () => {
        emits("parameters", text.value, selectedColor.value);
    };

    const saveChanges = () => {
        emits("btnClick");
    };
</script>

<style scoped>
    div {
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
