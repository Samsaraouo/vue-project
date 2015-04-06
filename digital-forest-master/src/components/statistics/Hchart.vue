<script setup>
import {onMounted, ref, watch} from "vue";
import Highcharts from 'highcharts/highstock';
import Highcharts3D from 'highcharts/highcharts-3d';
import {getUuid} from "@/components/util/index.js";

const props = defineProps({
  titleName: String,
  data: Array
})
const chart = ref()
const uuid = getUuid()

function initChart(data) {
  // 图表配置
  const options = {
    credits: {
      enabled: false
    },
    accessibility: {
      enabled: false,
    },
    chart: {
      type: data.type,
      backgroundColor: 'rgba(0,0,0,0)',
      options3d: {
        enabled: true,
        alpha: data.type === 'pie' ? 45 : 0,
        beta: data.type === 'pie' ? 0 : 0,
        depth: data.type === 'pie' ? 0 : 50,
        viewDistance: data.type === 'pie' ? 0 : 15
      }
    },
    title: {
      text: ''
    },
    tooltip: {
      pointFormat: '{series.name}  {point.y}'
    },
    yAxis: {
      title: {
        text: ''
      },
      labels: {
        style: {
          color: 'rgb(255,255,255)',
          fontSize: '1cqh'
        },
      },
      gridLineWidth: 0,
      minorGridLineWidth: 0
    },
    xAxis: {
      title: {
        text: ''
      },
      labels: {
        style: {
          color: 'rgb(255,255,255)',
          fontSize: '1cqh'
        },
      },
      gridLineWidth: 0,
      minorGridLineWidth: 0,
      categories: Array.from(data.yList, (item) => item.name)
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 35,
        dataLabels: {
          enabled: true,
          format: '{point.name}({point.y})'
        }
      },
      bar: {
        dataLabels: {
          enabled: true,
          allowOverlap: true // 允许数据标签重叠
        }
      },
      column: {
        dataLabels: {
          enabled: true,
          allowOverlap: true // 允许数据标签重叠
        }
      },
      series: {
        depth: 25,
        colorByPoint: true
      }
    },
    series: [{
      type: data.type,
      name: '',
      data: data.yList
    }]
  };
  Highcharts3D(Highcharts);
  Highcharts.chart(chart.value, options);
}

const focusKey = ref()
onMounted(() => {
  // let si = undefined
  watch(focusKey, (n, o) => {
    document.getElementById(uuid + n)?.setAttribute("style", "color: #84aff1;")
    document.getElementById(uuid + o)?.setAttribute("style", "color: #ffffff;")
    initChart(props.data[n])
  })
  watch(props, (n) => {
    // if (n.data.length > 1) {
    // if(si) clearInterval(si);
    // si = setInterval(() => {
    //   focusKey.value = focusKey.value >= n.data.length - 1 ? focusKey.value - n.data.length + 1 : focusKey.value + 1
    // }, 5000)

    // } else {
    initChart(n.data[0])
    // }
  })
})
const handleClick = (index) => {
  focusKey.value = index
}
</script>

<template>
  <div class="css-echart">
    <el-row>
      <el-col :span="24">
        <div class="menu">
          <p class="p">{{ props.titleName }}</p>
        </div>
      </el-col>
    </el-row>
    <el-row style="height: 32vh;">

      <el-col v-for="(item,index) in props.data" key="item.subtitle" :tabIndex="index" :id='uuid+index'
              @click="handleClick(index)"
              :span="parseInt(24/props.data.length)" class="subtitle"><p class="p">
        {{ item.subtitle }}</p></el-col>
      <div style="height: 100%;width: 100%;" ref="chart"></div>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.css-echart {
  height: calc(100% - 2vmin);
  width: 100%;
  box-sizing: border-box;
  margin: .5vmax;
  background-color: #01847F;
  filter: drop-shadow(5px 5px 2px #274847);

  .menu {
    background: linear-gradient(135deg, transparent 12px, #3a9393 0) left top, linear-gradient(-45deg, transparent 12px, #3a9393 0) right bottom;
    background-size: 50% 100%;
    background-repeat: no-repeat;
    filter: drop-shadow(3px 4px 2px #406B6A);
    text-align: center;
    height: 3.5vmin;
    color: white;
    margin: 1vmax;
    font: normal bold 1vmax arial, sans-serif;

    .p {
      padding: .4vmin 0 0 0;
      margin: 0;
      text-shadow: .2vmin .2vmin .1vmin #1e1d1d;
    }
  }

  .subtitle {
    text-align: center;
    color: white;
    cursor: pointer;
    height: 3cqh;
    font: normal .8cqmax arial, sans-serif;

    .p {
      margin: 0 0 0 0;
      text-shadow: .2vmin .2vmin .1vmin #1e1d1d;
    }
  }
}
</style>