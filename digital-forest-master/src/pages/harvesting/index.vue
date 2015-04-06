<script setup>

import Table from "@/components/statistics/table.vue";
import Menu from "@/components/statistics/menu.vue";
import Map from "@/components/map/Map.vue";
import {ref} from "vue";
import {getOwnershipData} from "@/pages/harvesting/js/response.js";

const data = ref({
  titleName: "数据分类体系",
  items: [
    {
      id: "采伐计划",
      children: [
        "木材采伐模块",
        "采伐计划模块",
      ]
    },
    {
      id: "生长管理",
      children: [
        "林木生长模块",
        "管护责任模块",
      ]
    },
    {
      id: "销售模块",
      children: [
        "资金管理",
        "交通管理",
        "储存管理",
        "原木运输模块",
        "生产销售模块",
        "木材加工模块",
      ]
    },
    {
      id: "其他",
      children: [
        "外部接口模块",
      ]
    },
  ]
})
const isMap = ref(false)
const dataMap = ref({})
const tableData = {
  ...getOwnershipData("木材采伐模块"),
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