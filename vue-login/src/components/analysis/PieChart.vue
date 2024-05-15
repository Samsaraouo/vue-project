<template>
    <div ref="chart" style="width: 100%; height: 400px;"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
    props: ['data'],
    mounted() {
        let chart = echarts.init(this.$refs.chart);
        chart.setOption({
            series: [{
                type: 'pie',
                data: this.data,
                radius: ['50%', '70%'],
                label: {
                    show: true,
                    formatter: '{b}: {d}%'
                }
            }]
        });
    }
};
</script>