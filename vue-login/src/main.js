import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
const app = createApp(App).use(ElementPlus).use(router);

app.mount('#app')
