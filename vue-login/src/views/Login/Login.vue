<template>
  <div class="login">
    <div class="login-body">
      <div class="login-title">
        松材线虫病虫害管理系统
      </div>
      <div class="login-form">
        <el-form :model="loginForm" >

        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { login } from '../api/index.js'

export default {
  data(){

    return{
      loginForm:{
        userName:'',
        passWord:''
      },
      rules:{
        userName:[{
          required:true,
          message:'用户账号必须输入',
          trigger:'blur'
        }],
        passWord:[{
          required:true,
          message:'用户密码必须输入',
          trigger:'blur'
        }]
      }
      
    }
  },
  methods:{
    
  }
}
</script>