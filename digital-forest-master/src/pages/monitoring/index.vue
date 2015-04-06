<script setup>

import Table from "@/components/statistics/table.vue";
import Menu from "@/components/statistics/menu.vue";
import Map from "@/components/map/Map.vue";
import {ref} from "vue";
import {getOwnershipData} from "@/pages/monitoring/js/response.js";

const data = ref({
  titleName: "数据分类体系",
  items: [
    {
      id: "实时监测",
      children: [
        "基本指标",
        "防盗",
        "林火检测",
      ]
    },
    {
      id: "变化监测",
      children: [
        "土地变化监测模块",
        "水土流失监测模块",
      ]
    },
    {
      id: "生态监测",
      children: [
        "森林健康检测模块",
        "病虫害检测模块",
        "动植物资源监测模块",
      ]
    },
  ]
})
const isMap = ref(false)
const dataMap = ref({})
const tableData = {
  ...getOwnershipData("基本指标"),
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