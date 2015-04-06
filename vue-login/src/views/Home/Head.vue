<script setup>
import {ref} from "vue";
  let nowtime = ref(new Date().toLocaleString())
setInterval(() => {
  nowtime.value = new Date().toLocaleString()
}, 1000);
</script>
<template>
  <el-row>
    <el-col :sm={span:10,push:7} :xs={span:20,push:2}>
      <div class="title"><p class="p">松材线虫管理平台</p></div>
    </el-col>
    <el-col :sm={span:3,pull:10} :xs={span:5,push:0}>
      <div class="grid-content">
        
      </div>
    </el-col>
    <el-col :sm={span:4,pull:10} :xs={span:7,push:0}>
      <div class="grid-content">
        <p class="p1">
          <el-icon>
            <Clock/>
          </el-icon>
          {{ nowtime }}
        </p>
      </div>
    </el-col>
    <el-col :sm={span:3} :xs={span:4,push:0}>
      <div class="grid-content" style="display: none">
        <p class="p1" >
          <el-icon>
            <HomeFilled/>
          </el-icon>
          首页
        </p>
      </div>
    </el-col>
    <el-col :sm={span:2} :xs={span:4,push:0}>
      <div class="grid-content">
        <p class="p1">
          <el-icon>
            <Tools/>
          </el-icon>
          用户管理
        </p>
      </div>
    </el-col>
    <el-col :sm={span:2} :xs={span:4,push:0}>
      <div class="grid-content">
        <p class="p1">
          <el-icon>
            <SwitchButton/>
          </el-icon>
          退出
        </p>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 0;
  left: 0;
  top: 0;
  /* //height: 6vh; */
}

.el-row:last-child {
  margin-bottom: 0;
  left: 0;
  top: 0;
}

.grid-content{
  border-radius: 4px;
  text-align: center;
  color: white;
  font: normal 2cqmin arial, sans-serif;

  .p1 {
    padding: 0;
    margin: 1.5cqmin 0 0.5cqmin 0;
    cursor: pointer;
    text-shadow: 3px 4px 2px #1e1d1d;
  }
}

.title {
  background-color: #01847F;
  width: 100%;
  height: 6vmin;
  text-align: center;
  font: normal bold 3cqmin arial, sans-serif;
  color: white;
  border-radius: 0 0 2cqw 2cqw;
  box-shadow: 0.01cqw .01cqw .9cqw 0.3cqw #67A8A5;
  .p {
    padding: 1cqmin 0 0 0;
    margin: 0 0 .5cqw 0;
    text-shadow: 3px 4px 2px #1e1d1d;
  }
}
</style>