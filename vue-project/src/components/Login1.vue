<template>
    <div class="container" >
        <div class="login-wrapper">
            <div class="header">登录</div>
            <div class="form-wrapper" v-on:keyup.enter="login">
                <a-input v-model:value="loginform.username" placeholder="请输入用户名">
      <template #prefix>
        <user-outlined type="user" />
      </template>
      <template #suffix>
        <a-tooltip title="Extra information">
          <InfoCircleOutlined style="color: rgba(0, 0, 0, 0.45)" />
        </a-tooltip>
      </template>
    </a-input>
    <br />
    <br />
    <a-input-password v-model:value="loginform.password" placeholder="请输入密码" >
        <template #prefix>
            <LockOutlined />
      </template>
    </a-input-password>
                <div class="btn" ><a-button type="primary" @click="login" v-on:keyup.enter="login">登录</a-button></div>
            </div>
        </div>
    </div>
</template>
<script>
import { UserOutlined, InfoCircleOutlined,LockOutlined} from '@ant-design/icons';
import { defineComponent, ref } from 'vue';
import LoginButton from "./LoginButton.vue";
import axios from 'axios';
export default defineComponent({
  components: {
    LoginButton,
    LockOutlined,
    UserOutlined,
    InfoCircleOutlined,
  },
  data(){
    return{
      loginform:{
      username: '',
      password: '',
      }
    }
  },
  methods: {
    async login() {
        try {
            const response = await axios.post('http://your-backend-url/login', {
                username: this.username,
                password: this.password
            });
            
            // 如果后端返回认证成功的响应，你可以在这里进行相应的操作，比如跳转到另一个页面
            // 例如，如果后端返回一个包含认证成功信息的JSON对象，你可以检查该对象并执行相应的操作

            console.log('Login successful');
            console.log('Server Response:', response.data);

            // 这里你可以根据后端返回的数据执行相应的操作，比如跳转到另一个页面
        } catch (error) {
            // 如果登录失败，处理错误情况
            console.error('Login failed:', error.message);
            
            // 这里你可以根据错误情况执行相应的操作，比如显示错误消息给用户
        }
    }
},
  setup() {
    return {
    };
  },
});
</script>
<style>
* {
            margin: 0;
            padding: 0;
        }
        html {
            height: 100%;
        }
        body {
            height: 100%;
        }
        .container {
            height: 100vh;
            overflow-y: scroll;
            max-width: 100vw;
            margin: 0 auto;
            background-image: linear-gradient(to right, #0d0547, #4b4b4b);
        }
        .login-wrapper {
            background-color: #ffffff;
            width: 358px;
            height: 588px;
            border-radius: 15px;
            padding: 0 50px;
            position: relative;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
        .header {
            font-size: 38px;
            font-weight: bold;
            text-align: center;
            line-height: 200px;
        }
        .input-item {
            display: block;
            width: 100%;
            margin-bottom: 20px;
            border: 0;
            padding: 10px;
            border-bottom: 1px solid rgb(128, 125, 125);
            font-size: 15px;
            outline: none;
        }
        .input-item:placeholder {
            text-transform: uppercase;
        }
        .btn {
            text-align: center;
            padding: 10px;
            width: 100%;
            margin-top: 40px;
            color: #fff;
        }
        .msg {
            text-align: center;
            line-height: 88px;
        }
        a {
            text-decoration-line: none;
            color: #abc1ee;
        }
</style>