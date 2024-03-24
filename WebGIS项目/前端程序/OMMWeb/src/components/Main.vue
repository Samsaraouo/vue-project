<template>
  <a-layout>
    <a-layout-sider style="width:200%;;background: #fff"><Sider></Sider></a-layout-sider>
    <a-layout style="min-height: 50vh;background-color: #b3b3b34d;height:max-content">
      <a-layout-header style="background-color:#fff;padding: 0%" >
      <DropDown />
    </a-layout-header>
      <a-layout-content style="height:max-content;background-color:#b3b3b34d"><div :style="{ padding: '10px 20px',background: '#f0f2f5', minHeight: '580px' }" >
          <RouterView />
        </div></a-layout-content>
        <a-layout-foote style="float: inherit;height:70px;text-align:center;background-color:#f0f2f5;">Made by Group 14</a-layout-foote>
    </a-layout>
  </a-layout>
  <!-- <a-layout-header style="background: #fff"><DropDown /></a-layout-header>
  <a-layout style="min-height: 50vh">    
    <a-layout-sider width="200" style="background: #fff">
<Sider></Sider>
    </a-layout-sider>
    <a-layout style="background-color: #fff;">
      <a-layout-content style="margin: 0 10px;background: #fff">
        <div :style="{ background: '#fff', minHeight: '720px' }">
          <RouterView />
        </div>
      </a-layout-content>
      
    </a-layout>
  </a-layout>
  <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer> -->
</template>
<script>
import { GlobalOutlined, QuestionOutlined } from '@ant-design/icons-vue';
import { RouterLink, RouterView } from "vue-router";
import { defineComponent, ref } from 'vue';
import Sider from './Sider.vue'
import DropDown from './DropDown.vue'
export default defineComponent({
  components: {
    QuestionOutlined,
    GlobalOutlined,
    Sider,
    DropDown
  },
  
  data() {
    return {
      collapsed: ref(false),
      selectedKeys: ref(['1']),
    };
  },

});
</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: #b3b3b34d;
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #f0f2f5;
}
</style>