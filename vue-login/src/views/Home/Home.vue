<template>
    <div class="container">
        <div class="grid-content">
            <p class="p1">
                <el-icon>
                    <Clock />
                </el-icon>
                {{ nowtime }}
            </p>
            <p class="p1">{{ wea.text }}   {{ wea.temp }}℃    {{ wea.windDir }}</p>
        </div>
        <div class="title">松材线虫病虫害管理系统</div>
        <div class="menu">
            <el-menu mode="horizontal">
                <el-menu-item index="1" @click="goToPage('/charts')"><el-icon><House /></el-icon>林地一张图</el-menu-item>
                <el-menu-item index="2" @click="goToPage('/analysis')"><el-icon><MagicStick /></el-icon>自定义绘图查询</el-menu-item>
                <el-menu-item index="3" @click="goToPage('/popup')"><el-icon><MapLocation /></el-icon>区划检索</el-menu-item>
                <el-menu-item index="4" @click="goToPage('/table')"><el-icon><Collection /></el-icon>疫木管理</el-menu-item>
            </el-menu>
        </div>
        <div class="text">
        <p class="p1" @click="user_manage">
          <el-icon>
            <Tools />
          </el-icon>
          用户管理
        </p>
        <p class="p1" @click="logout">
          <el-icon>
            <SwitchButton />
          </el-icon>
          退出
        </p>
      </div>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import axios from 'axios';
import router from "@/router";
let nowtime = ref(new Date().toLocaleString())
setInterval(() => {
    nowtime.value = new Date().toLocaleString()
}, 1000);
let weather = ref(''); // 创建一个响应式变量来存储天气信息
let wea = ref({
  text: "",
  temp: "",
  windDir: "",
});
const user_manage = () => {
  router.push("/usermanage")
}
const logout = () => {
  let _this = this;
  axios({
    method: 'GET',
    url: 'logout/',
  }).then(Response => {
    if (Response.data.code == 1) {
      router.push("/login")
      ElMessage.success("登出成功")
    }
  })
}
onMounted(async () => {
  const response = await axios.get('https://devapi.qweather.com/v7/weather/now?location=101210107&key=c65724d4cadd496690551ee9b1bd916a');
  console.log(response.data);
  wea.value = response.data?.now;; // 将天气信息存储在 weather 变量中
});
function goToPage(route) {
      router.push(route);
    }
const name = 'Navbar';
</script>

<style scoped>
.container {
    display: flex;
    background-color: #2D4B8B;
    align-items: center;
    justify-content: space-between;
    width: 100vw;
    height: 10vh;
}

.menu {
    display: flex;
    position: absolute;
    top: 0;
    left: 34vw;
    justify-content: space-between;
    width: 38vw;
    height: 10vh;
    /* margin-right: 20px; */
}

.title {
    font-size: 30px;
    /* margin-right: 20px; */
    width: 30vw;
    position: absolute;
    left: 8vw;
    color: #DAF9FF;
}

.el-menu {
    border: none !important;
    background-color: #2D4B8B;
    height: 10vh;
    color: white;
    flex-grow: 1;
    opacity: 1;
}

.el-menu-item {
    color: white !important;
    font-size: 18px;
}

.grid-content {
    border-radius: 4px;
    text-align: center;
    color: white;
    font: normal 2cqmin arial, sans-serif;
    width: 16vw;
}

.text {
    display: flex; /* 使用 flex 布局 */
    justify-content: space-between; /* 使元素在水平方向上均匀分布 */
    border-radius: 4px;
    position: absolute;
    right: 3vw;
    text-align: center;
    color: white;
    font: normal 2cqmin arial, sans-serif;
    width: 16vw;
}

</style>