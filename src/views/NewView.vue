<template>
  <Splitter class="splitter" :layout="layout">
    <SplitterPanel :size="55" :minSize="10"> e
    </SplitterPanel>
    <SplitterPanel :size="45" :minSize="10"> 
      <Note class="note" />
    </SplitterPanel>
  </Splitter>
</template>

<script>
  export default {
    data() {
      return {
        layout: "horizontal"
      }
    },
    methods: {
      chechSize: function() {
        if(window.innerWidth < 992) this.layout = "vertical";
        else this.layout = "horizontal";
      }
    },
    mounted() {
      this.chechSize();
      window.addEventListener("resize", this.chechSize);
    }
  }
</script>

<style>
  .splitter {
    max-width: 900px;
    height: 400px;
    position: relative;
    margin-top: 100px;
    left: 50%;
    transform: translate(-50%);
    border-radius: 2px;
  }
  .note {
    height: 300px;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @media(max-width: 991px) {
    .splitter {
      flex-direction: column;
      margin-top: 20px;
      max-width: 350px;
      height: 750px;
      position: relative;
      transform: translate(-50%);
    }
  }
</style>