<template>
    <a-form :model="SubmitData" layout='horizontal'	 :label-col="{ span: 7 }" :wrapper-col="{ span:14 }">
<a-form-item label="旧密码" name="oldPassword" :rules="[{ required: true, message: '请输入旧密码' }]">
        <a-input-password  v-model:value="SubmitData.oldPassword"/>
    </a-form-item>
    <a-form-item label="新密码" name="newPassword" :rules="[{ required: true, message: '请输入新密码' }]">
        <a-input-password  v-model:value="SubmitData.newPassword"/>
    </a-form-item>
    <a-form-item label="请再次输入新密码" name="alterPassword" :rules="[{ required: true,message:'请再次输入新密码' },{type: 'enum', enum: [SubmitData.newPassword],message:'两次输入的密码不一致'}]">
        <a-input-password  v-model:value="SubmitData.alterPassword"/>
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 16, span: 16 }">
        <a-button @click="resetdata"  >重置</a-button>
    <a-button type="primary"  @click="changePassword() " html-type="submit" >修改密码</a-button>
</a-form-item>
</a-form>
</template>

<script>
import { defineComponent, ref } from 'vue';
export default defineComponent({
    data(){
        return{
        SubmitData:{
            oldPassword: '',
            newPassword: '',
            alterPassword:''
        }
        }
    },
    methods:{
        changePassword(){
            let _this = this;
            this.axios({
                headers:{
                    'Authorization':"Bearer "+sessionStorage.getItem("token")
                },
                method: 'put',
                url: '/api/changePassword',
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
            oldPassword: '',
            newPassword: '',
            alterPassword:''
        }
        }
    }

})
</script>

<style >

</style>