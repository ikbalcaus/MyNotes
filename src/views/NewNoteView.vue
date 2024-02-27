<template>
  <Splitter class="splitter" :layout="layout">
    <SplitterPanel :minSize="10">
      <Editor class="editor" btn-text="Add note" @sendParameters="applyParameters" @btnClick="addNote" />
    </SplitterPanel>
    <SplitterPanel :minSize="10"> 
      <Note class="note" :enable-buttons="false" :text="text" :color="selectedColor" />
    </SplitterPanel>
  </Splitter>
</template>

<script setup>
  import { router } from '@/router';
  import { inject, onMounted, ref } from 'vue';

  const layout = ref("");
  const text = ref("");
  const selectedColor = ref("green");
  const notes = inject("notes");

  const checkSize = () => {
    if(window.innerWidth <= 767) layout.value = "vertical";
    else layout.value = "horizontal";
  }

  const applyParameters = (newText, newSelectedColor) => {
    text.value = newText;
    selectedColor.value = newSelectedColor;
  };

  const addNote = () => {
    notes.value.push({
      id: (notes.value.length > 0) ? (notes.value[notes.value.length - 1].id + 1) : 1,
      text: text.value,
      color: selectedColor.value,
      posX: Math.random() * 100,
      posY: Math.random() * 100
    });
    localStorage.setItem("notes", JSON.stringify(notes.value));
    router.push("/");
  }

  onMounted(() => {
    checkSize();
    window.addEventListener("resize", checkSize);
  });
</script>

<style scoped>
  .splitter {
    width: 100%;
    height: calc(100vh - 73px);
    border: none;
  }
  .editor {
    position: relative;
    top: 45%;
    transform: translateY(-50%);
    margin: 0 auto;
  }
  .note {
    position: relative;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
  }
</style>
