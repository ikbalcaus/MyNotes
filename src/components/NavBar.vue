<template>
    <nav>
        <RouterLink to="/" class="title" v-tooltip.bottom="'Notes overview'"><h1>MyNotes</h1></RouterLink>
        <ul class="actions">
            <li><RouterLink to="/new"><Button icon="pi pi-plus" class="nav-btn" rounded v-tooltip.left="'Create new note'" /></RouterLink></li>
            <li><Button @click="setTheme(true)" :icon="themeIcon" class="nav-btn" rounded v-tooltip.left="'Change theme'" /></li>
        </ul>
    </nav>
</template>

<script setup>
    import { onMounted, ref } from 'vue';

    const theme = ref();
    const themeIcon = ref();
    const navBackgroundColor = ref();
    const navTextColor = ref();

    const setTheme = (change) => {
        if (change) theme.value = (theme.value == "light") ? "dark" : "light";
        if(theme.value == "light") {
            localStorage.setItem("theme", "light");
            navBackgroundColor.value = "#f8f8f8";
            navTextColor.value = "black";
            themeIcon.value = "pi pi-moon";
        }
        else {
            localStorage.setItem("theme", "dark");
            navBackgroundColor.value = "#141414";
            navTextColor.value = "white";
            themeIcon.value = "pi pi-sun";
        }
        document.getElementById("theme").setAttribute("href", "./../node_modules/primevue/resources/themes/aura-" + theme.value + "-green/theme.css");
    }

    onMounted(() => {
        if(localStorage.getItem("theme")) {
            theme.value = localStorage.getItem("theme");
            setTheme(false);
        }
        else localStorage.setItem("theme", "light");
    })
</script>

<style scoped>
    nav {
        background-color: v-bind(navBackgroundColor);
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        user-select: none;
    }
    .nav-btn {
        box-shadow: -1px 1px 8px rgba(0, 150, 100, 0.35)
    }
    .title {
        color: v-bind(navTextColor);
        text-decoration: none;
        padding: 0 25px;
        position: relative;
        left: 50%;
        transform: translate(-50%);
    }
    .actions {
        display: flex;
        list-style: none;
        gap: 10px;
        margin-left: auto;
        margin-right: 25px;
    }

    @media (max-width: 767px) {
        .title {
            left: 0;
            transform: translate(0);
        }
    }
</style>
