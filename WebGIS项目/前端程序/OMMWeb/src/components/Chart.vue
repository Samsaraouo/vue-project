<template>
    <a-layout>
        <a-layout-header style="background: #fff;padding: 10px 10px;">
            <a-form layout="inline">
            <a-form-item>
                <a-input  placeholder="在此输入经度" v-model:value="Subdata.input1"></a-input>
            </a-form-item>
            <a-form-item >
                <a-input placeholder="在此输入纬度" v-model:value="Subdata.input2"></a-input>
            </a-form-item>
            <a-form-item><a-button type="primary" style="position:relative;left:10px;" @click="GetZoneMetal()">
    <template #icon><SearchOutlined /></template>
    查询
  </a-button></a-form-item>
  <a-form-item>
  <a-tooltip title="返回该点附近所有站点的金属统计量">
<info-circle-outlined style="color: rgba(64,169,255)" />
        </a-tooltip>
</a-form-item>
            </a-form>
        </a-layout-header>
    <div id="chartcontainer">
<div id="main" style="width: 600px;height:400px;"></div>
</div>
</a-layout>
</template>

<script>
import { defineComponent, ref } from 'vue';
import {SearchOutlined,InfoCircleOutlined} from '@ant-design/icons-vue';
import * as echarts from 'echarts';

export default defineComponent({
    components:{
        SearchOutlined,
        InfoCircleOutlined
    },
    setup(){
        return{
            
        }
    },
    data(){
        return{
            Subdata:{
                input1:'',
                input2:'',
            },
            myChart:""
        }
    },
    mounted(){
        var myChart = echarts.init(document.getElementById('main'));
        this.myChart=myChart
        this.myChart.setOption(this.initchart())
    },
    methods:{
        SetChart(Option){
            this.myChart.setOption(Option)
        },
        GetZoneMetal(){
            let _this=this;
            this.axios({
                headers:{
                    'Authorization':"Bearer "+sessionStorage.getItem("token")
                },
                method: 'post',
                url: '/api/GetZoneMetal',
                data: _this.Subdata
            }).then(res=>{
                if(res.data.code==1){
                    this.$message.success(res.data.message);
                    var option={
                        title: {
                            text: '区域内金属统计'
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
            text: '区域内金属统计'
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