<template>
<div class="login-container">
  <div class="login-win">
    <div class="login-body">
      <div class="login-title">
        松材线虫病虫害管理系统
      </div>
      <div class="login-form">
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item style="margin-bottom: 30px" prop ="username">
            <el-input type="text"
            v-model="loginForm.username" suffix-icon="User"
            placeholder="请输入您的账号"
            @keyup.enter="login"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" suffix-icon="Lock"
            v-model="loginForm.password"
            placeholder="请输入您的密码"
            @keyup.enter="login">
          </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
             style="margin-top:25px;width:100%;background-color: #0043a7;"
             @click="login"
             v-on:keyup.enter="login"
             type="primary">用户登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000/'
export default {
  data(){
    
    return{
      loginForm:{
        username:'',
        password:''
      },
      rules:{
        username:[{
          required:true,
          message:'用户账号必须输入',
          trigger:'blur'
        }],
        password:[{
          required:true,
          message:'用户密码必须输入',
          trigger:'blur'
        }]
      }
      
    }
  },
  methods: {
    login () {
      let _this = this;
      
      axios({
          method: 'POST',
          url: 'login/',
          data: _this.loginForm
        }).then(Response=>{
          if(Response.data.code==1){
            this.$message.success("登录成功");
            let token=Response.data.access;
            sessionStorage.setItem("token",token);
            sessionStorage.setItem("username",Response.data.username);
            sessionStorage.setItem("usernickname",Response.data.name);
            sessionStorage.setItem("email",Response.data.email);
            this.$router.push("/home");
          }
        }).catch(error=>{
          this.$message.error("登录失败，请检查用户名或密码");
        })
      
    }
  },
  setup() {
    return {
    };
  },
}
</script>

<style>
.login-container{
  background-image: url('/src/views/Login/background.png');
  background-size: cover; 
  position: fixed;
  width: 100%; /* 宽度自适应父容器 */
  height: auto; /* 高度按比例缩放 */
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  object-fit: cover;
}
.login-win{
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%,-50%);
  width: 400px;
  height: 300px;
  padding: 15px 25px;
  border-radius: 5px;
  background-color: #fff;
}
.login-body{
  width: 100%;
}
.login-title{
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #0043a7;
  margin-bottom: 45px;
  margin-top: 15px;
}
</style>