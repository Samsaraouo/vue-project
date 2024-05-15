<script setup>
import {onBeforeMount, ref} from "vue";
import * as echarts from "echarts";
import get_statistics from "./getdata";
const digitData = ref({})
onBeforeMount(async ()=>{
    const staticdata = await get_statistics();
    digitData.value = {
    titleName: "松材线虫受灾数据",
    items: [
        {
        name: "受灾林地面积",
        num: (Number(staticdata[0])/1000000).toFixed(2) + " km²",
        img:"/src/components/charts/pic/land.png"
        },
        {
        name: "受灾小班数量",
        num: staticdata[2] + " 个",
        img:"/src/components/charts/pic/dashboard.png"
        },
        {
        name: "受灾树木数量",
        num: staticdata[4] + " 株",
        img:"/src/components/charts/pic/forest.png"
        },
        {
        name: "受灾最严重的村庄",
        num: staticdata[6].slice(1,4),
        img:"/src/components/charts/pic/village.png"
        },
    ]
    }
})
</script>

<template>
<div class="digit">
    <el-row>
      <el-col :span="24">
        <div class="menu">
          <p class="p">{{ digitData.titleName }}</p>
        </div>
      </el-col>
    </el-row>
    <el-row justify="space-around" align="middle" >
      <el-col v-for="item in digitData.items" :span="12" class="digit-menu">
        <el-row class="digit-title">
          <el-col :span="10">
            <el-image class="img" :src="item.img"/>
          </el-col>
          <el-col :span="14">
            <el-row >
              <p class="p1">{{ item.name }}</p>
            </el-row>
            <el-row >
              <p class="p2">{{ item.num }}</p>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>
  </div>
</template>

<style>
.digit {
  height: 30vh;
  width: 100%;
  box-sizing: border-box;
  margin: .5vmax;
  background-color: #2D4B8B;
  border: 2px solid #136FAC; /* 设置边框宽度为 1px，样式为实线，颜色为黑色 */

  .menu {
    background: linear-gradient(135deg, transparent 12px, #4a83fc 0) left top, linear-gradient(-45deg, transparent 12px, #4a83fc 0) right bottom;
    background-size: 50% 100%;
    background-repeat: no-repeat;
    filter: drop-shadow(3px 4px 2px #335ebc);
    text-align: center;
    height: 3.5vmin;
    color: white;
    margin: 1vmax;
    font: normal bold 1vmax arial, sans-serif;
    

    .p {
      padding: .4vmin 0 0 0;
      margin: 0;
      text-shadow: .2vmin .2vmin .1vmin #1e1d1d;
    }
  }
}

.digit-menu {
  margin: 0 0 0 0;

  .digit-title {
    /* color: white; */
    text-align: center;

    .img {
      width: 9cqh;
      height: 9cqh;
      margin: 1cqh;
      text-shadow: 3px 4px 2px #1e1d1d;
      filter: drop-shadow(3px 3px 2px #000000);
    }

    .p1 {
      padding: 2cqh 0 0 0;
      height: 2cqh;
      margin: 0;
      color: #ffffff;
      font: italic bold 1.9vh arial, sans-serif;
      text-shadow: .2vmin .2vmin .1vmin #1e1d1d;

    }

    .p2 {
      padding: 3cqh 0 0 0;
      height: 2cqh;
      margin: 0;
      color: #FBF02C;
      font: italic bold 1.8vh arial, sans-serif;
      text-shadow: .2vmin .2vmin .1vmin #1e1d1d;

    }
  }
}
</style>