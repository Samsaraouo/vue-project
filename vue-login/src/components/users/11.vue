<script>
import axios from 'axios';

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
            mobilePlaceholder: '请输入电话'
        };
    },
    methods: {
        registerUser() {
            if (!this.username || !this.password || !this.email || !this.mobile) {
                this.$message.warning('请填写所有必填字段');
                return;
            }

            // Password validation
            const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
            if (!passwordRegex.test(this.password)) {
                this.$message.error('密码必须为6-20位，且包含英文字符和数字');
                return;
            }

            const userData = {
                username: this.username,
                password: this.password,
                email: this.email,
                mobile: this.mobile
            };

            axios.post('/create_user', userData)
                .then(response => {
                    // 处理注册成功的逻辑
                    console.log(response.data);
                })
                .catch(error => {
                    // 处理注册失败的逻辑
                    console.error(error);
                });
        }
    }
};
</script>
