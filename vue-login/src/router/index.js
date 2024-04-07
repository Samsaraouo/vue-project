import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import Home from '../App.vue'
import Login from '../views/Login/Login.vue'
import Map from '../components/map.vue'
import UserManage from '../components/user_manage.vue'

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
      component : Map
    },
    {
      path: '/map',
      name: 'map',
      component: Map
    },
    {
      path:'/usermanage',
      name:'usermanage',
      component : UserManage
    }
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