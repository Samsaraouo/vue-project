<script setup>
import {onMounted, ref} from "vue";
import * as echarts from "echarts";
const props = defineProps({
  titleName: String,
  xList: Array,
  yList: Array,
  type:String
})
const titleName = ref()
const chart = ref()
titleName.value = props.titleName
const xList = ref(props.xList)
const yList = ref(props.yList)
onMounted(() => {
  const myChart = echarts.init(chart.value);

  myChart.setOption({
    title: {
      text: ''
    },
    tooltip: {},
    xAxis: {
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
      data: xList.value,
      show: props.type!=="pie"
    },
    yAxis: {
      axisLine: {
        lineStyle: {
          color: '#fff',
        },
      },
    },
    series: [
      {
        name: '',
        type: props.type,
        lineStyle: {
          width: 2,
          color: '#333399'
        },
        itemStyle:{
          borderColor: '#fff',
          borderWidth: 0.5,
          color: '#ff00ff55'
        },
        data: yList.value
      }
    ]
  });
})
</script>

<template>
  <div class="css-echart">
    <el-row>
      <el-col :span="24">
        <div class="menu">
          <p class="p">{{ titleName }}</p>
        </div>
      </el-col>
    </el-row>
    <el-row style="height: 30vh;">
      <div id="chart" style="height: 100%; width: 100%;" ref="chart"></div>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.css-echart {
  height: calc(100% - 20px);
  width: 100%;
  box-sizing: border-box;
  margin: 10px;
  background-color: #01847F;
  filter: drop-shadow(5px 5px 2px #274847);

  .menu {
    background: linear-gradient(135deg, transparent 12px, #3a9393 0) left top, linear-gradient(-45deg, transparent 12px, #3a9393 0) right bottom;
    background-size: 50% 100%;
    background-repeat: no-repeat;
    filter: drop-shadow(5px 5px 1px #406B6A);
    text-align: center;
    height: 3.5vh;
    color: white;
    margin: 20px 20px;
    font: normal bold 20px arial, sans-serif;

    .p {
      padding: 6px 0 0 0;
      margin: 0;
    }
  }
}
</style>