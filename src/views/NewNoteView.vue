<template>
  <Splitter class="splitter" :layout="layout">
    <SplitterPanel :minSize="10">
      <Editor class="editor" @parameters="applyParameters" />
    </SplitterPanel>
    <SplitterPanel :minSize="10"> 
      <Note class="note" :text="text" :color="selectedColor" />
    </SplitterPanel>
  </Splitter>
</template>

<script setup>
  import { onMounted, ref } from 'vue';

  const layout = ref("");
  const text = ref("");
  const selectedColor = ref("green");

  const checkSize = () => {
    if(window.innerWidth < 992) layout.value = "vertical";
    else layout.value = "horizontal";
  }

  const applyParameters = (newText, newSelectedColor) => {
    text.value = newText;
    selectedColor.value = newSelectedColor;
  };

  onMounted(() => {
    checkSize();
    window.addEventListener("resize", checkSize);
  });
</script>

<style>
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

  @media( max-width: 991px ) {
    .splitter {
      flex-direction: column;
    }
    .editor, .note {
      top: 50%;
    }
  }
</style>
