<template>
<a-form :model="SubmitData" layout='horizontal'	 :label-col="{ span: 6 }" :wrapper-col="{ span:6 }">
    <a-form-item label="ID:" name="id" :rules="[{ required: true, message: '请输入记录ID' }]">
        <a-input  v-model:value="SubmitData.id"/>
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 16, span: 16 }">
        <a-button @click="resetdata"  >重置</a-button>
    <a-button type="primary" @click="deletedata"  html-type="submit" danger>删除</a-button>
</a-form-item>
</a-form>
</template>

<script>
import { defineComponent, ref,reactive } from 'vue';
import { message } from 'ant-design-vue'
export default defineComponent({
    setup(){
    },
    data(){
        return{
            SubmitData:{
                id:null
            }
        }
    },
    methods:{
        deletedata(){
            let _this = this;
            this.axios({
                headers:{
                    'Authorization':"Bearer "+sessionStorage.getItem("token")
                },
                method: 'post',
                url: '/api/DeleteMetalRow',
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
                id:null
            };
        }
    }
})
</script>

<style >

</style>