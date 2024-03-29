<template>
    <div class="login-container">
      <Form
        ref="form"
        :rules="rules"
        :model="form"
        label-width="80px"
        class="login-form"
      >
        <!-- 账号：label-显示的文字，v-model-绑定的属性值 -->
        <h2 class="login-title">会员管理系统</h2>
        <Form.item label="账号" prop="username">
          <Input v-model="form.username"></Input>
        </Form.item>
        <!-- 密码 -->
        <Form.item label="密码" prop="password">
          <Input v-model="form.password" type="password"></Input>
        </Form.item>
        <!-- 按钮 -->
        <Form.item>
          <Button type="primary" @click="submitForm('form')">登录</Button>
        </Form.item>
      </Form>
    </div>
  </template>
   
  <script>
  import { Button, Checkbox, Form, Input } from 'antd';
  export default {
    data() {
      return {
        form: {
          username: "",
          password: "",
        },
        //校验规则
        rules: {
          username: [
            { required: true, message: "请输入用户名称", trigger: "blur" },
            { min: 2, max: 7, message: "长度在 2 到 7 个字符", trigger: "blur" },
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 6, max: 15, message: "长度在 6 到 15个字符", trigger: "blur" },
          ],
        },
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          //console.log(valid);//校验成功则valid为true。反之
          if (valid) {
            //提交表单给后台验证是否正确
            alert("submit!");
          } else {
            console.log("验证失败");
            return false;
          }
        });
      },
    },
  };
  </script>

  
  <style scoped>
  .login-form {
    width: 350px;
    /* 上下边距160px,左右自动居中 */
    margin: 180px auto;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 28px;
    border-radius: 20px;
  }
  .login-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 1280px;
    height: 720px;
    background: url(background.png);
  }
  .login-title {
    text-align: center;
  }
  </style>