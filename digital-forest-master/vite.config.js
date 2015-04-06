import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue'
import cesium from 'vite-plugin-cesium';
import path from "path";

export default defineConfig({
    plugins: [
        vue(),
        cesium({
            rebuildCesium: true
        })
    ],
    resolve: {
        alias: {
            // 关键代码
            '@': path.resolve(__dirname, './src'),
            src: path.resolve(__dirname, './src'),
            public: path.resolve(__dirname, './public'),
        }
    },
})
