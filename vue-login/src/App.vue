<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Home from './views/Home/Home.vue';
window.scrollTo(0,0)
window.oncontextmenu = function (e) {
  // 取消默认的浏览器自带右键 很重要！！
  e.preventDefault();
};

</script>

<template>
  <div style="position: fixed; width: 100%;">
    <el-row>
      <el-col>
        <!-- <Head></Head> -->
        <Home></Home>
      </el-col>
    </el-row>
    <!-- <el-row>
      <el-col>
        <Menu></Menu>
      </el-col>
    </el-row> -->
    <el-row>
      <el-col>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">

.el-row {
  margin-top: 0;
}

.el-row:last-child {
  margin-top: 0;
}
</style>
