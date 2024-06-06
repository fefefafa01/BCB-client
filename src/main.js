import { createApp } from 'vue'
import '@/css/style.css'
import App from '@/App.vue'
import Router from '@/router/index.js'

const app = createApp(App)
app.use(Router).mount('#app')
