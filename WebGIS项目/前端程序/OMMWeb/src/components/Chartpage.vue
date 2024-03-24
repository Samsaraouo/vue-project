<template>
    <a-layout >
    <a-layout-sider style="background: #fff">
        <a-menu
            v-model:selectedKeys="selectedKeys"
            mode="inline"
            style="height: 100%"
            theme
          >
      <a-menu-item key="zonechart" class="item">  
        <RouterLink to="/main/chartpage/zonechart">
                区域统计
        </RouterLink>
            </a-menu-item>
            <a-menu-item key="oceanchart">
                <RouterLink to="/main/chartpage/oceanchart">
                海洋分布
            </RouterLink>
            </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content ><div id="chartpage"><RouterView /></div></a-layout-content>
</a-layout>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';
import { defineComponent, ref } from 'vue';
import Chart from "../components/Chart.vue"
export default defineComponent({
    watch:{
      $route(to,from,){
        console.log(this.$route.path);
        this.selectedKeys=[this.$route.name]
      }
    },
    components:{
        Chart
    },
    data(){
      return{
      selectedKeys: [this.$route.name]
    }
    },
})
</script>

<style >
#chartpage{
    min-height: 500px;
    background-color: white;
}
</style>