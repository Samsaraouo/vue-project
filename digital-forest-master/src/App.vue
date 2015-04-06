<script setup>
import Head from "./components/Head.vue";
import Menus from "@/components/Menus.vue";
import {Ion} from "cesium";

Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMjUzM2ZlNS01MjI2LTQzODQtYjE1ZC0xMDI0NWJjZ" +
    "GEwMTUiLCJpZCI6MTIxNzkxLCJpYXQiOjE2ODU5NDM0MTl9.KAb9mSMkf3AzZtEiz-V8nnFHdqvunoRFkC6BFRb32_E";

window.oncontextmenu = function (e) {
  // 取消默认的浏览器自带右键 很重要！！
  e.preventDefault();
};
</script>

<template>
  <div style="position: fixed; width: 100%;">
    <el-row>
      <el-col>
        <Head></Head>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <Menus></Menus>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <router-view></router-view>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">

.el-row {
  margin-bottom: 0;
}

.el-row:last-child {
  margin-bottom: 0;
}
</style>
