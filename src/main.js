import { createApp } from 'vue';
import '@/css/style.css';
import App from '@/App.vue';
import Router from '@/router/index.js';

import VueSplide from '@splidejs/vue-splide';
import '@splidejs/vue-splide/css';

const app = createApp(App);
app.use(VueSplide).use(Router).mount('#app');
