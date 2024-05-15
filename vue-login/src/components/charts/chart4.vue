<script setup>
import axios from 'axios';
import { onMounted, ref } from "vue";
import * as echarts from "echarts";
onMounted(async () => {
    let json = {}
    let array = []
    await axios({
        method: 'GET',
        url: 'get_dilei/',
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
    const myChart = echarts.init(document.getElementById("chart4"));
    var pieData = []
    for (let i = 0; i < array.length; i = i + 2) {
        var res =
        {
            value: parseInt(array[i]),
            name: array[i + 1]
        }

        pieData.push(res);
    }
    console.log(pieData);
    var option = {
        textStyle: {
            color: '#EDE6F2'  // 全局字体颜色
        },
        title: {
            text: "疫木地类分布表",
            textStyle: {
                color: '#EDE6F2'
            },
        },
        series: [{
            type: 'pie',
            data: pieData,
            radius: ['50%', '70%'],
            label: {
                show: true,
                formatter: '{b}:{d}%'
            }
        }]
    }
    myChart.setOption(option);
})
</script>



<template>
    <div id="chart4" style="height: 30vh;width: 100%;">
    </div>
</template>

<style></style>
