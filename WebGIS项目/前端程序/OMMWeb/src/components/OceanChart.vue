<template>
<a-layout>
        <a-layout-header style="background: #fff;padding: 10px 10px;">
            <a-form layout="inline">
                <a-radio-group v-model:value="data.ocean">
        <a-radio-button value="Pacific" @click="ButtonClick('Pacific')">太平洋</a-radio-button>
        <a-radio-button value="Atlantic" @click="ButtonClick('Atlantic')">大西洋</a-radio-button>
        <a-radio-button value="Arctic" @click="ButtonClick('Arctic')">北冰洋</a-radio-button>
        <a-radio-button value="India" @click="ButtonClick('India')">印度洋</a-radio-button>
      </a-radio-group>
            </a-form>
            
        </a-layout-header>
    <div id="chartcontainer">
<div id="main" style="width: 600px;height:400px;"></div>
</div>
</a-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import * as echarts from 'echarts';
export default defineComponent({
    data(){
        return{
            data:{
                ocean:"Pacific",
            },
            myChart:""
        }
    },
    mounted(){
            var myChart = echarts.init(document.getElementById('main'));
            this.myChart=myChart;
            this.myChart.setOption(this.initchart());
            this.GetOceanMetal();
        },
    methods:{
        ButtonClick(ocean){
            this.data.ocean=ocean;
            this.GetOceanMetal();
        },
        SetChart(Option){
            this.myChart.setOption(Option)
        },
        GetOceanMetal(){
                let _this=this;
                this.axios({
                    headers:{
                        'Authorization':"Bearer "+sessionStorage.getItem("token")
                    },
                    method:'post',
                    url:'/api/GetOceanMetal',
                    data:this.data
                }).then(res=>{
                if(res.data.code==1){
                    this.$message.success(res.data.message);
                    var option={
                        title: {
                            text: '海洋内金属统计'
                        },
                        tooltip: {},
                        legend: {
                            data: ['站点金属总量']
                        },
                        xAxis: {
                            data: ['mn','fe','co','ni','cu','zn','pb','si']
                        },
                        yAxis: {},
                        series: [
                            {
                            name: '站点金属总量',
                            type: 'bar',
                            data: res.data.data
                            }
                        ]
                    };
                    this.SetChart(option);
                }
                else if(res.data.code==2){
                    this.$message.info(res.data.message);
                }
                else if(res.data.code==0){
                    this.$message.error(res.data.message);
                }
            })  
        },
            initchart(){
            // 绘制图表
            // 基于准备好的dom，初始化echarts实例
            // 指定图表的配置项和数据
            var option = {
            title: {
                text: '海洋内金属统计'
            },
            tooltip: {},
            legend: {
                data: ['站点金属总量']
            },
            xAxis: {
                data: ['mn','fe','co','ni','cu','zn','pb','si']
            },
            yAxis: {},
            series: [
                {
                name: '站点金属总量',
                type: 'bar',
                data: []
                }
            ]
            };
            // 使用刚指定的配置项和数据显示图表。
            return option
            }
        }
})
</script>

<style >
#chartcontainer{
    padding: 5px 10px;
    background-color: white;
}
</style>