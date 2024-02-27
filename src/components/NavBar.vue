<template>
    <nav>
        <RouterLink to="/" class="title"><h1>MyNotes</h1></RouterLink>
        <ul class="actions">
            <li><RouterLink to="/new"><Button icon="pi pi-plus" rounded v-tooltip.left="'Create new note'" /></RouterLink></li>
            <li><Button @click="setTheme(true)" :icon="themeIcon" rounded v-tooltip.left="'Change theme'" /></li>
        </ul>
    </nav>
</template>

<script setup>
    import { onMounted, ref } from 'vue';

    const theme = ref("light");
    const themeIcon = ref("pi pi-moon");
    
    const navBackgroundColor = ref("#f8f8f8");
    const navTextColor = ref("black");
    const navBorderColor = ref("#ccc");

    const setTheme = (change) => {
        if (change) theme.value = (theme.value == "light") ? "dark" : "light";
        if(theme.value == "light") {
            localStorage.setItem("theme", "light");
            navBackgroundColor.value = "#f8f8f8";
            navTextColor.value = "black";
            navBorderColor.value = "#ccc";
            themeIcon.value = "pi pi-moon";
        }
        else {
            localStorage.setItem("theme", "dark");
            navBackgroundColor.value = "#121216";
            navTextColor.value = "white";
            navBorderColor.value = "#777";
            themeIcon.value = "pi pi-sun";
        }
        document.getElementById("theme").setAttribute("href", "./node_modules/primevue/resources/themes/aura-" + theme.value + "-green/theme.css");
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
        border-bottom: 1px solid v-bind(navBorderColor);
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
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

    @media(max-width: 767px) {
        .title {
            left: 0;
            transform: translate(0);
        }
    }
</style>
