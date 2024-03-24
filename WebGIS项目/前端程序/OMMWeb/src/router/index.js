import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import Main from '../components/main.vue'//主页
import Login from "../components/Login.vue"//登陆
import Openlayers from "../components/Openlayers.vue"
import table from  "../components/Table.vue"
import Main2 from  "../components/Main2.vue"
import SettingPage from  "../components/SettingPage.vue"
import Chartpage from "../components/Chartpage.vue"
import Chart from "../components/Chart.vue"
import OceanChart from "../components/OceanChart.vue"
import TDMap from "../components/TDMap.vue"
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/main',
        component: Main,
        name:'main',
        children:[
          {
            path: 'map',
            component: Openlayers,
            SelectID:'1',
            name:'map',
          },
          // {
          //   path: '3DMap',
          //   component: TDMap,
          //   SelectID:'2',
          //   name:'TDmap',
          // },
          {
            path: 'chartpage',
            component:Chartpage,
            SelectID:'3',
            name:'chartpage',
            children:[
              {
                path:'zonechart',
                component:Chart,
                name:'zonechart'
              },
              {
                path:'oceanchart',
                component:OceanChart,
                name:'oceanchart'
              }
            ]
          },
          {
            path: 'table',
            component: table,
            SelectID:'4',
            name:'table',
            props: {a:900}
          },
          {
            path:'setting',
            component:SettingPage,
            name:'setting'
          }
        ]
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
