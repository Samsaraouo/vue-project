<script setup>

import Menu from "@/components/statistics/menu.vue";
import {ref} from "vue";
import ModelInput from "@/pages/model/component/ModelInput.vue";

const data = ref({
  titleName: "模型执行流程",
  items: [
    {
      id: "模型输入设置",
      children: [
        "模型设置",
        "站点设置",
        "时间设置",
        "参数设置",
        "输出设置",
        "地理数据",
        "土壤数据",
        "气候数据",
        "大气数据",
        "土地覆盖数据",
        "干扰和管理",
      ]
    },
    {
      id: "模型输入数据",
      children: [
        "地形地貌",
        "土壤",
        "气候",
        "大气",
        "氮沉降",
        "土地覆盖",
        "干扰和管理",
      ]
    },
    {
      id: "模型参数设置",
      children: [
        "城市过程参数",
        "光合过程参数",
        "农田物候参数",
        "农业技术参数",
        "生理生化参数",
        "自然植被物候参数",
      ]
    },
    {
      id: "模型运行",
      children: [
        "执行"
      ]
    },
    {
      id: "模型输出数据",
      children: [
        "植被碳库",
        "土壤碳库",
        "NPP",
        "NCE",
      ]
    },
    {
      id: "处理结果与分析",
      children: [
        "统计分析",
        "动画场景分析",
      ]
    },
    {
      id: "其他",
      children: [
        "帮助",
      ]
    },
  ]
})
</script>

<template>
  <div style="height: 91.5vh;overflow-y: auto;position: fixed">
    <el-row>
      <el-col :sm="5">
        <el-row class="css-row">
          <Menu v-bind="data"></Menu>
        </el-row>
      </el-col>
      <el-col :sm="19">
        <el-row class="css-row">
          <ModelInput></ModelInput>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.css-row {
  min-height: calc(91vmin - 2vmax);
  width: 100%;
}
</style>