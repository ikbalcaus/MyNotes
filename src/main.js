import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import PrimeVue from 'primevue/config';
import NavBar from './components/NavBar.vue';
import Note from './components/Note.vue';
import Button from 'primevue/button';
import Tooltip from 'primevue/tooltip';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';

import 'primevue/resources/themes/aura-light-green/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(PrimeVue);

app.component('NavBar', NavBar);
app.component('Note', Note);
app.component('Button', Button);
app.component('tooltip', Tooltip);
app.component('Splitter', Splitter);
app.component('SplitterPanel', SplitterPanel);

app.use(router);
app.mount('#app');
