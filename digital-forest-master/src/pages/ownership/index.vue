<script setup>

import Table from "@/components/statistics/table.vue";
import Menu from "@/components/statistics/menu.vue";
import {ref} from "vue";
import {getOwnershipData} from "@/pages/ownership/js/response.js";
import Map from "@/components/map/Map.vue";

const data = ref({
  titleName: "数据分类体系",
  items: [
    {
      id: "林木管理",
      children: [
        "林权信息管理",
        "被征用林地管理",
        "林木伐区划分管理",
        "林木保护管理",
      ]
    },
    {
      id: "资料管理",
      children: [
        "审计管理",
        "档案管理",
        "统计报表模块",
        "单位信息管理",
      ]
    },
  ]
})
const isMap = ref(false)
const dataMap = ref({})
const tableData = {
  ...getOwnershipData("林权信息管理"),
  showMap: (val) => {
    isMap.value = true;
    dataMap.value = {
      urls: val
    }
  }
}
</script>

<template>
  <div style="height: 91.5vh;overflow-y: auto;position: relative">
    <el-row>
      <el-col :sm="5">
        <el-row class="css-row">
          <Menu v-bind="data"></Menu>
        </el-row>
      </el-col>
      <el-col :sm="19">
        <el-row class="css-row">
          <Table v-show="!isMap" v-bind="tableData"></Table>
          <Map v-if="isMap" v-bind="dataMap"></Map>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.css-row {
  min-height: calc(91vmin - 2vmax);
  width: 100%;
}
</style>