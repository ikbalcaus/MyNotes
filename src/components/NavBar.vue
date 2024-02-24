<template>
    <nav>
        <RouterLink to="/" class="title"><h1>MyNotes</h1></RouterLink>
        <ul class="actions">
            <li><RouterLink to="/new"><Button icon="pi pi-plus" rounded v-tooltip.left="'Create new note'" /></RouterLink></li>
            <li><Button icon="pi pi-moon" rounded v-tooltip.left="'Change theme'" /></li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "NavBar",
        methods: {
            changeTheme() {
                document.body.classList.toggle("dark");
            }
        }
    }
</script>

<style scoped>
    nav {
        background-color: #f8f8f8;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    .title {
        color: black;
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
