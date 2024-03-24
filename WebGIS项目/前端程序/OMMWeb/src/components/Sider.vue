<template>
    <div >
      <div style="float:left;padding: 0%;"><h1 class="logo">海洋多金属管理系统</h1></div>
      <a-menu
            v-model:selectedKeys="selectedKeys"
            v-model:openKeys="openKeys"
            mode="inline"
            style="height: 100%"
            theme
          >
      <a-menu-item key="map" class="item">  
              <RouterLink to="/main/map">
                <picture-two-tone />
                二维展示
              </RouterLink>             
            </a-menu-item>
            <!-- <a-menu-item key="TDmap">
              <RouterLink to="/main/3DMap">
                <project-two-tone />
                三维地图
              </RouterLink>
            </a-menu-item> -->
            <a-menu-item key="chartpage">
              <RouterLink to="/main/chartpage/zonechart">
                <pie-chart-two-tone />
                图表统计
              </RouterLink>              
            </a-menu-item>

            <a-menu-item key="table">
              <RouterLink to="/main/table">
                <tool-two-tone />
                测点管理
              </RouterLink>             
            </a-menu-item>
            <a-menu-item key="setting">
              <RouterLink to="/main/setting">
                <setting-two-tone />
                账户设置
              </RouterLink>             
            </a-menu-item>
      </a-menu>
    </div>
  </template>
  <script>
  import { defineComponent, reactive, toRefs } from 'vue';
  import { PictureTwoTone,ProjectTwoTone,PieChartTwoTone,HighlightTwoTone,BorderOuterOutlined,ToolTwoTone,SettingTwoTone } from '@ant-design/icons-vue';
  import { RouterLink, RouterView } from 'vue-router';
  export default defineComponent({
    watch:{
      $route(to,from,){
        console.log(this.$route.path);
        this.selectedKeys=[this.$route.name]
      }
    },
    mounted(){
      this.selectedKeys=[this.$route.name]
    },
    data(){
      return{
      selectedKeys: []
    }
    },
    components: {
      ToolTwoTone,
      PictureTwoTone,
      ProjectTwoTone,
      PieChartTwoTone,
      HighlightTwoTone,
      BorderOuterOutlined,
      RouterLink, 
      RouterView,
      SettingTwoTone
    },
    setup() {
      return {
      };
    },
  });
  </script>
  <style>
  .logo {
    color: rgb(0, 0, 0);
    font-size: 20px;
    margin: 0 0 0 12px;
    font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;
    font-weight: 500;
    vertical-align: middle;
}
.item {
  font-family: Avenir,Helvetica Neue,Arial,Helvetica,sans-serif;

}
</style>