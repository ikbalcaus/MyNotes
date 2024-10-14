import { createApp } from "vue"
import App from "./App.vue"
import { router } from "./router"
import PrimeVue from "primevue/config";
import NavBar from "./components/NavBar.vue";
import Note from "./components/Note.vue";
import Editor from "./components/Editor.vue";
import Button from "primevue/button";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import Tooltip from "primevue/tooltip";

const app = createApp(App);
app.use(PrimeVue);

app.component("NavBar", NavBar);
app.component("Note", Note);
app.component("Editor", Editor);
app.component("Button", Button);
app.component("Splitter", Splitter);
app.component("SplitterPanel", SplitterPanel);
app.component("Textarea", Textarea);
app.component("Dropdown", Dropdown);
app.directive("tooltip", Tooltip);

app.use(router);
app.mount("#app");
