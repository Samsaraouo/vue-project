<script setup>
import { onMounted, ref, watch } from "vue";
import router from "@/router/index.js";

const items = ref([
  { label: "林地一张图", route: "home" },
  { label: "林业资源管理系统", route: "resource" },
  { label: "森林动态模拟系统", route: "model" },
  { label: "林业权属管理系统", route: "ownership" },
  { label: "碳汇交易管理系统", route: "carbonTrading" },
  { label: "林业审批管理系统", route: "approval" },
  { label: "林木采伐管理系统", route: "harvesting" },
  { label: "林地监测管理系统", route: "monitoring" },
  // "森林康养地管理系统",
])
const foucsKey = ref()
const changePage = (item) => {
  foucsKey.value = item.route
  switch (item.label) {
    case "林地一张图": {
      router.push("/home")
      break
    }
    case "林业资源管理系统": {
      router.push("/resource")
      break;
    }
    case "森林动态模拟系统": {
      router.push("/model")
      break
    }
    case "林业权属管理系统": {
      router.push("/ownership")
      break
    }
    case "碳汇交易管理系统": {
      router.push("/carbonTrading")
      break
    }
    case "林业审批管理系统": {
      router.push("/approval")
      break
    }
    case "林木采伐管理系统": {
      router.push("/harvesting")
      break
    }
    case "林地监测管理系统": {
      router.push("/monitoring")
      break
    }

  }
}
onMounted(() => {
  foucsKey.value = foucsKey.value || (window.location.href.split("#/")[1] || "home")
  console.log(foucsKey.value)
  document.getElementById(foucsKey.value)?.setAttribute("style", "filter: drop-shadow(.5vmin .5vmin .3vmin #ffffff);")
  watch(foucsKey, (n, o) => {
    document.getElementById(n)?.setAttribute("style", "filter: drop-shadow(.5vmin .5vmin .3vmin #ffffff);")
    document.getElementById(o)?.setAttribute("style", "filter: drop-shadow(.5vmin .5vmin .2vmin #406B6A);")
  })
})
</script>

<template>
  <div class="box">
    <div v-for="(item, index) in items" class="menu" :tabIndex="index" :id="item.route" @click="changePage(item)">
      <p class="p">{{ item.label }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  text-align: center;
  margin: 2vmin 1vmin 0 1vmin;
  overflow-y: auto;
  display: grid;
  //grid-gap: 1.5vw;
  grid-template-columns: repeat(8, 19vmin);
  grid-template-rows: 4.5vmin;
  justify-content: space-between;

  .menu {
    background: linear-gradient(112deg, transparent 1vmin, #01847F 0) left top,
      linear-gradient(-68deg, transparent 1vmin, #01847F 0) right bottom;
    background-size: 51% 100%;
    background-repeat: no-repeat;
    filter: drop-shadow(.5vmin .5vmin .2vmin #406B6A);
    text-align: center;
    height: 3vmin;
    font: normal 1.3vmin arial, sans-serif;
    color: white;
    //margin: 0 1vmin;

    .p {
      padding: .5vmin 0 0 0;
      margin: 0;
      cursor: pointer;
      text-shadow: .5vmin .5vmin .2vmin #1e1d1d;
    }
  }

  //.menu:focus {
  //  filter: drop-shadow(5px 5px 5px #ffffff);
  //  outline: none;
  //}
}

.box::-webkit-scrollbar {
  display: none;
}
</style>