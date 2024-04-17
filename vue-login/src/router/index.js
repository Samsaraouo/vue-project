import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import Home from '../App.vue'
import Login from '../views/Login/Login.vue'
import Map from '../components/map/map.vue'
import UserManage from '../components/user_manage.vue'
import MapCharts from '../components/map/map_charts.vue'
import chart1 from '../components/charts/chart1.vue'

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
      path: '/map',
      name: 'map',
      component: Map
    },
    {
      path:'/usermanage',
      name:'usermanage',
      component : UserManage
    },
    {
      path:'/chart1',
      name:'chart1',
      component : chart1
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