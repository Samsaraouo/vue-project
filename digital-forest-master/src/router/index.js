import { createRouter, createWebHashHistory } from "vue-router";

export default createRouter({
    history: createWebHashHistory(""),
    routes: [
        {
            path: "/",
            redirect: "/home",
        },
        {
            path: "/home",
            component: () => import("../pages/dlem/index.vue"),
        },
        {
            path: "/resource",
            component: () => import("../pages/resource/index.vue"),
        },
        {
            path: "/model",
            component: () => import("../pages/model/index.vue"),
        },
        {
            path: "/ownership",
            component: () => import("../pages/ownership/index.vue"),
        },
        {
            path: "/carbonTrading",
            component: () => import("../pages/carbonTrading/index.vue"),
        },
        {
            path: "/approval",
            component: () => import("../pages/approval/index.vue"),
        },
        {
            path: "/harvesting",
            component: () => import("../pages/harvesting/index.vue"),
        },
        {
            path: "/monitoring",
            component: () => import("../pages/monitoring/index.vue"),
        },
    ],
});
