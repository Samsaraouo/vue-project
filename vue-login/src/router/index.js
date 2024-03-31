import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login/Login.vue'


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
      component: HomeView
    },
  ]
})
router.beforeEach((to,from,next)=>{
  if(to.path=="/"){
      next("/main");
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