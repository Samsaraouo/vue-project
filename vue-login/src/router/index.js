import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import Login from '../views/Login/Login.vue'
import Popup from '../components/popup/index.vue'
import UserManage from '../components/user_manage.vue'
import MapCharts from '../components/charts/index.vue'
import table from '../components/tables/table.vue'
import analysis from '../components/analysis/index.vue'
import usermanage from '../components/users/index.vue'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component : MapCharts
    },
    {
      path: '/charts',
      name: 'charts',
      component : MapCharts
    },
    {
      path: '/popup',
      name: 'Popup',
      component: Popup
    },
    {
      path:'/usermanage',
      name:'usermanage',
      component : usermanage
    },
    {
      path:'/table',
      name:'table',
      component : table
    },
    {
      path:'/analysis',
      name:'analysis',
      component : analysis
    },
  ]
})
router.beforeEach((to,from,next)=>{
  if(to.path=="/"){
      next("/home");
  }
  if(to.path=="/login"){
      next();
  }
  else{
      let token=sessionStorage.getItem("token");
      token ? next():next("/login");
  }
  
})
export default router