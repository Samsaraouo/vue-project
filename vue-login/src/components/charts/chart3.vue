<script setup>
import axios from 'axios';
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
onMounted(async () => {
    let json = {}
    let array = []
    await axios({
        method: 'GET',
        url: 'get_xj/',
    }).then(Response => {
        json = Response.data;
        array = json.split(",");
    })
    let xList = []
    for (let i = 0; i <= array.length - 2; i = i + 2) {
        xList.push(array[i])
    }
    let yList = [];
    for (let i = 1; i <= array.length - 2; i = i + 2) {
        yList.push(array[i])
    }
    const myChart = echarts.init(document.getElementById("chart3"));
    var option = {
        textStyle: {
            color: '#EDE6F2'  // 全局字体颜色
        },
        title: {
            text: "疫木胸径频率表",
            textStyle: {
                color: '#EDE6F2'
            },
        },
        // 图表的提示
        tooltip: {},
        // 图例
        legend: {
            data: ["胸径"], textStyle: {
                color: '#EDE6F2'
            },
        },
        // x轴线
        xAxis: {
            data: yList, axisLabel: {
                color: '#EDE6F2'  // x轴标签字体颜色
            }
        },
        // y轴线
        yAxis: {},
        // 设置数据
        series: [
            {
                // 数据名称
                name: "胸径",
                // 类型为柱状图
                type: "bar",
                // 数据data
                data: xList,

            }
        ]
    }
    myChart.setOption(option);
})
</script>



<template>
    <div id="chart3" style="height: 60vh;width: 100%;">
    </div>
</template>

<style></style>