<template>
<a-form :model="SubmitData" layout='horizontal'	 :label-col="{ span: 6 }" :wrapper-col="{ span:6 }">
    
    <a-form-item label="站点号" name="stationcode" :rules="[{ required: true, message: '请输入站点号' }]">
        <a-input  v-model:value="SubmitData.stationcode"/>
    </a-form-item>
    <a-form-item label="经度" name="stationlongtitude" :rules="[{ required: true, message: '请输入经度' }]">
        <a-input  v-model:value="SubmitData.stationlongtitude"/>
    </a-form-item>
    <a-form-item label="纬度" name="stationlatitude" :rules="[{ required: true, message: '请输入纬度' }]">
        <a-input  v-model:value="SubmitData.stationlatitude"/>
    </a-form-item>
    <a-form-item label="水深" >
        <a-input  v-model:value="SubmitData.waterdepth"/>
    </a-form-item>
    <a-form-item label="锰含量" >
        <a-input  v-model:value="SubmitData.mn" defaultValue=0 />
    </a-form-item>
    <a-form-item label="铁含量" >
        <a-input  v-model:value="SubmitData.fe"/>
    </a-form-item>
    <a-form-item label="钴含量" >
        <a-input  v-model:value="SubmitData.co"/>
    </a-form-item>
    <a-form-item label="镍含量" >
        <a-input  v-model:value="SubmitData.ni"/>
    </a-form-item>
    <a-form-item label="铜含量" >
        <a-input v-model:value="SubmitData.cu" />
    </a-form-item>
    <a-form-item label="锌含量" >
        <a-input  v-model:value="SubmitData.zn"/>
    </a-form-item>
    <a-form-item label="铝含量" >
        <a-input  v-model:value="SubmitData.al"/>
    </a-form-item>
    <a-form-item label="硅含量" >
        <a-input  v-model:value="SubmitData.si"/>
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 16, span: 16 }">
        <a-button @click="resetdata"  >重置</a-button>
    <a-button type="primary" @click="adddata"  html-type="submit">添加数据</a-button>
</a-form-item>
</a-form>
</template>
<script>
import { defineComponent, ref,reactive } from 'vue';
import { message } from 'ant-design-vue'
export default defineComponent({
    setup(){
        const NormalData={
                stationcode:'',
                stationlongtitude:'',
                stationlatitude:'',
                waterdepth:null,
                mn:null,
                fe:null,
                co:null,
                ni:null,
                cu:null,
                zn:null,
                pb:null,
                al:null,
                si:null,
            }
        return{
            NormalData
        }
    },
    data(){
        return{
            SubmitData:this.NormalData
        }
    },
    methods:{
        adddata(){
            let _this = this;
            this.axios({
                headers:{
                    'Authorization':"Bearer "+sessionStorage.getItem("token")
                },
                method: 'post',
                url: '/api/AddMetalRow',
                data: _this.SubmitData        
            }).then(res=>{
                if(res.data.code==1){
                    message.success(res.data.message);
                    this.resetdata();
                }
                else{
                    message.error(res.data.message);
                }
                })
        },
        resetdata(){
            this.SubmitData={
                stationcode:'',
                stationlongtitude:'',
                stationlatitude:'',
                waterdepth:null,
                mn:null,
                fe:null,
                co:null,
                ni:null,
                cu:null,
                zn:null,
                pb:null,
                al:null,
                si:null,
            };
        }
    }
})
</script>

<style >

</style>