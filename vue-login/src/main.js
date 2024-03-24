import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue';

const app = createApp(App).use(Antd).use(router);

app.mount('#app')
