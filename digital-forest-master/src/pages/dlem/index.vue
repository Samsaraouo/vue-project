<script setup>

import Digit from "@/components/statistics/digit.vue";
import Map from "@/pages/dlem/components/Map.vue";
import {onBeforeMount, ref} from "vue";
import Hchart from "@/components/statistics/Hchart.vue";
import {getCarbonStocks, getStatistics, getTreeAge, getTreeDbh, getTreeHeight, getVolume} from "@/services/api.js";

const data = ref({
  titleName: "能量储备分布图",
  data: [],
})
const data3 = ref({
  titleName: "测树因子频率分布图",
  data: [],
})
const data2 = ref({
  titleName: "小班蓄积量分布图",
  data: [],
})
const digitData = ref({})
onBeforeMount(async () => {
  const statistics = (await getStatistics()).data[0]
  digitData.value = {
    titleName: "林地资源汇总",
    items: [
      {
        name: "林地面积",
        num: statistics.area + " hm²",
        img: "/farm.png"
      },
      {
        name: "林地数量",
        num: statistics.count + " 个",
        img: "/baohuqu.png"
      },
      {
        name: "总株数",
        num: statistics.treeCount + " 株",
        img: "/forest.png"
      },
      {
        name: "树种类型",
        num: statistics.typeCount + " 种",
        img: "/tree.png"
      },
      {
        name: "总蓄积量",
        num: statistics.volume + " m³",
        img: "/volume.png"
      },
      {
        name: "总碳储量",
        num: statistics.carbonStocks + " tC",
        img: "/carbonStocks.png"
      },
    ]
  }
  data.value.data.push({
    subtitle: "碳储量(tC)",
    type: "bar",
    xList: [],
    yList: (await getCarbonStocks()).data.map((item) => {
          return {
            ...item,
            y: item.carbonStocks * 1
          }
        }
    )
  })
  data.value.data.push({
    subtitle: "碳密度(t/hm²)",
    type: "bar",
    xList: [],
    yList: (await getCarbonStocks()).data.map((item) => {
          return {
            ...item,
            y: item.carbonStockUnit * 1
          }
        }
    )
  })
  data.value.data.push({
    subtitle: "面积(hm²)",
    type: "bar",
    xList: [],
    yList: (await getCarbonStocks()).data.map((item) => {
          return {
            ...item,
            y: item.area
          }
        }
    )
  })
  data.value.data.push({
    subtitle: "蓄积量(m³)",
    type: "bar",
    xList: [],
    yList: (await getCarbonStocks()).data.map((item) => {
          return {
            ...item,
            y: item.sum
          }
        }
    )
  })
  data2.value.data.push({
    subtitle: "蓄积量(m³)",
    type: "pie",
    xList: [],
    yList: (await getVolume()).data.map((item) => {
          return {
            ...item,
            name: item.name
          }
        }
    )
  })
  data3.value.data.push({
    subtitle: "树高(m)",
    type: "column",
    xList: [],
    yList: (await getTreeHeight()).data.map((item) => {
          return {
            ...item,
            name: item.name + "m"
          }
        }
    )
  })
  data3.value.data.push({
    subtitle: "胸径(cm)",
    type: "column",
    xList: [],
    yList: (await getTreeDbh()).data.map((item) => {
          return {
            ...item,
            name: item.name + "cm"
          }
        }
    )
  })
  data3.value.data.push({
    subtitle: "树龄(年)",
    type: "column",
    xList: [],
    yList: (await getTreeAge()).data.map((item) => {
          return {
            ...item,
            name: item.name + "年"
          }
        }
    )
  })
})

</script>

<template>
  <div style="height: 91.5vh;overflow-y: auto;position: absolute">
    <el-row>

      <el-col :sm={span:14,push:5}>
        <el-row class="css-row-map">
          <Map></Map>
        </el-row>
      </el-col>
      <el-col :sm={span:5,pull:14}>
        <el-row class="css-row">
          <digit v-bind="digitData"></digit>
        </el-row>
        <el-row class="css-row">
          <Hchart v-bind="data"></Hchart>
        </el-row>
      </el-col>
      <el-col :sm="5">
        <el-row class="css-row">
          <Hchart v-bind="data2"></Hchart>
        </el-row>
        <el-row class="css-row">
          <Hchart v-bind="data3"></Hchart>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.css-row {
  height: calc(45.5vh - 1vmax);
  width: 100%;
}

.css-row-map {
  height: 87.5vmin;
  width: 100%;
}
</style>