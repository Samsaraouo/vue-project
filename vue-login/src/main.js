import './style.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import eventBus from 'vue3-eventbus';
const app = createApp(App).use(ElementPlus).use(router).use(eventBus);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.mount('#app')
