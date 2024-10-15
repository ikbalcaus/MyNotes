import { createRouter, createWebHistory } from "vue-router"
import IndexView from "./views/IndexView.vue"
import EditNoteView from "./views/EditNoteView.vue"

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: IndexView },
    { path: "/new", component: EditNoteView },
    { path: "/edit/:id", component: EditNoteView }
  ]
});
