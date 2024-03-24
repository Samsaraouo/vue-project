import { createApp, VueElement } from "vue";
import App from "./App.vue";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import 'mapbox-gl/dist/mapbox-gl.css'
import router from './router';
import { message } from 'ant-design-vue'
import axios from "axios";
import VueAxios from 'vue-axios'
const app = createApp(App).use(Antd).use(router).use(VueAxios,axios);

app.mount("#app");