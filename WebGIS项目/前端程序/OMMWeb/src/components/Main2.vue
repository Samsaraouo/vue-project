<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header class="header" style="background-color: #fff;">
    </a-layout-header>
    <a-layout-content style=" background: #fff ;" >  
      <a-layout style=" background: #fff ;height:100%;" >
        <a-layout-sider width="150" style="background: #fff;height: auto:100%;">
          <a-menu
            v-model:selectedKeys="selectedKeys2"
            v-model:openKeys="openKeys"
            mode="inline"
            style="height: 100%"
          >
          
            <a-menu-item key="1">  
              <RouterLink to="/Main2/map">
                <picture-two-tone />
                二维展示
              </RouterLink>             
            </a-menu-item>

            <a-menu-item key="2">
              <RouterLink to="/三维地图">
                <project-two-tone />
                三维地图
              </RouterLink>
            </a-menu-item>

            <a-menu-item key="3">
              <RouterLink to="/图表统计">
                <pie-chart-two-tone />
                图表统计
              </RouterLink>              
            </a-menu-item>

            <a-menu-item key="4">
              <RouterLink to="/测点管理">
                <border-outer-outlined />
                测点管理
              </RouterLink>             
            </a-menu-item>

            <a-menu-item key="5">
              <RouterLink to="/修改密码">
                <highlight-two-tone />
                修改密码
              </RouterLink>             
            </a-menu-item>
          </a-menu>
        </a-layout-sider>

        <a-layout-content :style="{ padding: '0 24px', minHeight: '300px' }">
          <RouterView />
        </a-layout-content>
      </a-layout>
    </a-layout-content>

  </a-layout>
</template>

<script>
import { PictureTwoTone,ProjectTwoTone,PieChartTwoTone,HighlightTwoTone,BorderOuterOutlined } from '@ant-design/icons-vue';
import { defineComponent, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
export default defineComponent({
  components: {
    PictureTwoTone,
    ProjectTwoTone,
    PieChartTwoTone,
    HighlightTwoTone,
    BorderOuterOutlined,
    RouterLink, 
    RouterView
  },
});
</script>

<style>
#components-layout-demo-top-side .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
