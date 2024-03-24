<template>
<div  id="BasicSetting">
  <h1 class="Tittle">账户设置</h1>
<div id="AccountForm">
        <a-form layout="vertical">
          <h1 class="item">昵称：</h1>
          <a-form-item
          >
            <a-input v-model:placeholder="usernickname" v-model:value="this.userinfo.usernickname"/>
          </a-form-item>
          <h1 class="item">邮箱：</h1>
          <a-form-item
            :required="false"
          >
            <a-input v-model:placeholder="email" v-model:value="this.userinfo.email"/>
          </a-form-item>

          <a-form-item>
            <a-button @click="this.showCPModal()">修改密码</a-button>
            <a-button type="primary" @click="this.updateinfo()">更新信息</a-button>
          </a-form-item>
        </a-form>
        <a-modal v-model:visible="CPModalVisible" title="修改密码" @ok="AMhandleOk" okText="确定" cancelText="取消">
          <ChangePassword/>
    </a-modal>
</div>
</div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import ChangePassword from './ChangePassword.vue';
export default defineComponent({
  components:{
    ChangePassword
  },
  methods:{
    updateinfo(){
      let _this=this
      this.axios({
        headers:{
          'Authorization':"Bearer "+sessionStorage.getItem("token")
        },
        method: 'put',
          url: '/api/updateUserInfo',
          data: _this.userinfo
      }).then(Response=>{
          if(Response.data.code==1){
            this.$message.success("更新成功");
            if(this.userinfo.usernickname!=''){
            sessionStorage.setItem("usernickname",_this.userinfo.usernickname);
            }
            if(this.userinfo.email!=''){
            sessionStorage.setItem("email",_this.userinfo.email);
            }
            this.reload();
          }
          else{
            this.$message.error("更新失败");
          }
        }).catch(error=>{
          this.$message.error("更新失败");
        })
    },
    reload(){
      this.$router.go(0)
    },
  },
  data(){
    return{
      userinfo:{
      usernickname:'',
      email:'',
    }
    }
  },
  setup(){
    const usernickname=ref(sessionStorage.getItem("usernickname"));
    const email=ref(sessionStorage.getItem("email"));
    const CPModalVisible =ref(false);
    const showCPModal = () => {
            CPModalVisible.value = true;
        };
    const AMhandleOk = e => {
            console.log(e);
            CPModalVisible.value = false;
    };

    return{
      usernickname,
      email,
      CPModalVisible,
      showCPModal,
      AMhandleOk
    }
  }
})
</script>
<style>
.Tittle{
  float:initial;
  color: black;
  font-size: xx-large;
}
.item{
  float: left;
}
#AccountForm{
  float: left;
  padding: 13px 50px;
  width: 600px;
  justify-content: left;
}
#BasicSetting{
  float:left;
  height:500px;
  width: 1280px;
  background-color: white;
  -webkit-box-flex: 1;
    flex: 1 1 0%;
    padding: 8px 40px;
}
</style>