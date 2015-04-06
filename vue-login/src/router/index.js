import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import Home from '../App.vue'
import Login from '../views/Login/Login.vue'
import map from '../components/Map/map.vue'

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
      component: map
    },
    {
      path: '/map',
      name: 'map',
      component: map
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