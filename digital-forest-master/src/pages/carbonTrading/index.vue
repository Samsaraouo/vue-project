<script setup>

import Table from "@/components/statistics/table.vue";
import Menu from "@/components/statistics/menu.vue";
import Map from "@/components/map/Map.vue";
import {ref} from "vue";
import {getOwnershipData} from "@/pages/carbonTrading/js/reponse.js";

const data = ref({
  titleName: "数据分类体系",
  items: [
    {
      id: "项目管理",
      children: [
        "项目管理",
        "活动管理",
        "售后服务模块",
        "财务管理",
      ]
    },
    {
      id: "交易管理",
      children: [
        "碳汇交易模块",
        "碳排放计算模块",
      ]
    },
    {
      id: "分析管理",
      children: [
        "数据分析模块",
        "报告生成模块",
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
  ...getOwnershipData("项目管理"),
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