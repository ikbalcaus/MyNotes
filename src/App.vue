<template>
    <NavBar />
    <RouterView />
</template>

<script setup>
    import { provide, ref } from "vue";

    provide("notes", ref(JSON.parse(localStorage.getItem("notes")) || []));
</script>

<style>
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style>
