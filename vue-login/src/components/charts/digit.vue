<script setup>
const props = defineProps({
  titleName: String,
  items: Array
})
</script>

<template>
  <div class="digit">
    <el-row>
      <el-col :span="24">
        <div class="menu">
          <p class="p">{{ props.titleName }}</p>
        </div>
      </el-col>
    </el-row>
    <el-row justify="space-around" align="middle" style="height: 35cqh;">
      <el-col v-for="item in props.items" :span="12" class="digit-menu">
        <el-row class="digit-title">
          <el-col :span="12">
            
          </el-col>
          <el-col :span="10">
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

<style scoped lang="scss">
.digit {
  height: calc(100% - 2vmin);
  width: 100%;
  box-sizing: border-box;
  margin: .5vmax;
  background-color: #01847F;
  filter: drop-shadow(5px 5px 2px #274847);

  .menu {
    background: linear-gradient(135deg, transparent 12px, #3a9393 0) left top, linear-gradient(-45deg, transparent 12px, #3a9393 0) right bottom;
    background-size: 50% 100%;
    background-repeat: no-repeat;
    filter: drop-shadow(3px 4px 2px #406B6A);
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
    //color: white;
    text-align: center;

    .img {
      width: 6cqh;
      height: 6cqh;
      margin: 1cqh;
      text-shadow: 3px 4px 2px #1e1d1d;
      filter: drop-shadow(3px 3px 2px #000000);
    }

    .p1 {
      padding: 2cqh 0 0 0;
      height: 2cqh;
      margin: 0;
      color: #a4d79e;
      font: italic bold 1.6vh arial, sans-serif;
      text-shadow: .2vmin .2vmin .1vmin #1e1d1d;

    }

    .p2 {
      padding: 2cqh 0 0 0;
      height: 2cqh;
      margin: 0;
      color: #eccc7c;
      font: italic bold 1.3vh arial, sans-serif;
      text-shadow: .2vmin .2vmin .1vmin #1e1d1d;

    }
  }
}
</style>