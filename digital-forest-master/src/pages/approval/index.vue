<script setup>

import Table from "@/components/statistics/table.vue";
import Menu from "@/components/statistics/menu.vue";
import Map from "@/components/map/Map.vue";
import {ref} from "vue";
import {getOwnershipData} from "@/pages/approval/js/response.js";

const data = ref({
  titleName: "数据分类体系",
  items: [
    {
      id: "用地审批",
      children: [
        "用地审批",
        "造林审批",
        "碳汇交易审批",
        "林业范围内工程建设审批模块",
      ]
    },
    {
      id: "林权审批",
      children: [
        "林权权属变更管理",
        "林权终止管理",
        "业务流程管理",
      ]
    },
    {
      id: "林木采伐审批",
      children: [
        "申请管理",
        "许可证管理",
        "采伐计划管理",
        "统计报表管理",
        "审批流程管理",
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
  ...getOwnershipData("用地审批"),
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
  width: 100%;
  min-height: calc(91vmin - 2vmax);
}
</style>