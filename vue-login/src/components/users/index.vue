<template>
    <div id="bg" style="background-image: url('/src/views/Login/background.png');">
        <div id="register">
            <h1 style="color: #0043a7; text-align: center;">用户注册</h1>
            <el-form @submit="registerUser">
                <el-form-item label="用户名" required>
                    <el-input v-model="username" :placeholder="usernamePlaceholder"></el-input>
                </el-form-item>
                <el-form-item label="密码" required>
                    <el-input type="password" v-model="password" :placeholder="passwordPlaceholder"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" required>
                    <el-input type="email" v-model="email" :placeholder="emailPlaceholder"></el-input>
                </el-form-item>
                <el-form-item label="电话" required>
                    <el-input type="tel" v-model="mobile" :placeholder="mobilePlaceholder"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" native-type="submit">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from '@/router';
export default {
    data() {
        return {
            username: '',
            password: '',
            email: '',
            mobile: '',
            usernamePlaceholder: '请输入用户名',
            passwordPlaceholder: '请输入密码',
            emailPlaceholder: '请输入邮箱',
            mobilePlaceholder: '请输入电话',
        };
    },
    methods: {
        async registerUser() {
            if (!this.username || !this.password || !this.email || !this.mobile) {
                this.$message.warning('请填写所有必填字段');
                return;
            }

            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
            if (!passwordRegex.test(this.password)) {
                this.$message.error('密码必须为6-20位，且包含英文字符和数字');
                return;
            }

            await axios({
                method: "POST",
                url: "create_user/",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                data: { username: this.username,
                password: this.password,
                email: this.email,
                mobile: this.mobile },
            }).then((Response) => {
                let json = Response;
                console.log(json);
                if(json.data == "SUCCESS"){
                    ElMessage.success('注册成功');
                    router.push('/home');
                }else if(json.data == "ERROR"){
                    ElMessage.error('注册失败');
                }
            });

        }
    }
};
</script>


<style scoped>
#register {
    width: 20vw;
    height: 40vh;
    position: absolute;
    top: 20%;
    left: 50vw;
    margin: 0 auto;
    padding: 20px;
    border: none;
    border-radius: 5px;
    background-color: #f2f2f2;
}

#bg {
    width: 100vw;
    height: 100vh;
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>