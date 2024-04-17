<script setup>
import "cesium/Build/CesiumUnminified/Widgets/widgets.css";
import { onMounted, ref, watch } from "vue";
import {
  TileMapServiceImageryProvider,
  Viewer,
  buildModuleUrl,
  Cartesian3,
  Math as cesiumMath,
} from "cesium";
import * as Cesium from "cesium";
import { ElLoading } from "element-plus";
import axios from "axios";
import { dataType } from "element-plus/es/components/table-v2/src/common";
import { showpoint, showxb, remove } from "./map_select";
import showPopup from "./pick";
import EE from "../../utils/emitter";

const cesiumContainer = ref();
const viewer = ref();
const tiandituTk = "bf0f37b22a7a08132dc9d5104a708f88";
window.CESIUM_BASE_URL = "node_modules/cesium/Build/CesiumUnminified/";
window.oncontextmenu = function (e) {
  // 取消默认的浏览器自带右键 很重要！！
  e.preventDefault();
};
window.Cesium = Cesium;
onMounted(async () => {
  // const loading = ElLoading.service({
  //   lock: false,
  //   text: "地图拼命加载中...",
  //   background: "#00000011",
  //   target: cesiumContainer.value
  // });
  viewer.value = new Viewer(cesiumContainer.value, {
    baseLayer: false,
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    vrButton: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false, //点击功能
    timeline: false,
    navigationHelpButton: false,
    requestRenderMode: false,
    imageryProvider: new TileMapServiceImageryProvider({
      url: "node_modules/cesium/Build/CesiumUnminified/Assets/Textures/NaturalEarthII",
    }),
  });
  let globe = viewer.value.scene.globe;
  // 一定要为 true，否则 undergroundColor 设置无效
  globe.translucency.enabled = true;
  // 基础色透明，默认是蓝色 Cesium.Color.BLUE
  //   globe.baseColor = Cesium.Color.TRANSPARENT;
  // 地下色透明，默认是黑色 Cesium.Color.BLACK
  globe.undergroundColor = Cesium.Color.TRANSPARENT;
  // 隐藏天空大气层，否则最外围有一圈
  viewer.value.scene.skyAtmosphere.show = false;
  // viewer.value.imageryLayers.addImageryProvider(
  //   new Cesium.WebMapTileServiceImageryProvider({
  //     url: "http://t{s}.tianditu.gov.cn/cia_w/wmts?tk=" + tiandituTk,
  //     layer: 'cia',
  //     subdomains: [0, 1, 2, 3, 4, 5, 6, 7],
  //     style: 'default',
  //     maximumLevel: 18,
  //     tileMatrixSetID: "w"
  //   })
  // )
  viewer.value.imageryLayers.addImageryProvider(
    new Cesium.WebMapTileServiceImageryProvider({
      url: "http://t0.tianditu.gov.cn/img_w/wmts?tk=" + tiandituTk,
      layer: "img",
      style: "default",
      format: "tiles",
      tileMatrixSetID: "w",
      maximumLevel: 18,
      credit: new Cesium.Credit("© Tianditu", "http://www.tianditu.gov.cn/"),
    })
  );

  viewer.value.terrainProvider = await Cesium.CesiumTerrainProvider.fromUrl(
    "http://localhost:8802/terrain/"
  );

  viewer.value.camera.flyTo({
    destination: Cartesian3.fromDegrees(120.295535, 28.871887, 8000),
    orientation: {
      heading: cesiumMath.toRadians(0.0),
      pitch: cesiumMath.toRadians(-60.0),
    },
    duration: 3,
  });
  // viewer.value.imageryLayers.addImageryProvider(
  //   new Cesium.ArcGisMapServerImageryProvider({
  //     url : 'https://localhost:6443/arcgis/services/huzhen/MapServer/WmsServer?'
  //   })
  // )
});
function close() {
  if (document.getElementsByClassName("bx-popup-ctn").length > 0) {
    var elements = document.getElementsByClassName("bx-popup-ctn");
    for (var i = 0; i < elements.length; i++) {
      // 确保元素是父元素的直接子元素，然后移除它
      if (elements[i].parentNode) {
        elements[i].parentNode.removeChild(elements[i]);
      }
    }
  }
}

var data = {
  linban: "",
  linbans: [
    {
      value: "0001",
    },
    {
      value: "0002",
    },
    {
      value: "0003",
    },
    {
      value: "0004",
    },
    {
      value: "0005",
    },
    {
      value: "0006",
    },
    {
      value: "0007",
    },
    {
      value: "0008",
    },
    {
      value: "0009",
    },
    {
      value: "0010",
    },
    {
      value: "0011",
    },
  ],
};
</script>

<template>
  <el-button style="margin-top: 25px; width: 80px; background-color: #66cc99"
    @click="showpoint(viewer, data.linban)">查找疫木</el-button>
  <el-button style="margin-top: 25px; width: 80px; background-color: #66cc99"
    @click="showxb(viewer, data.linban)">查找小班</el-button>
  <el-button style="margin-top: 25px; width: 80px; background-color: #66cc99" @click="remove(viewer)">移除</el-button>
  <el-button style="margin-top: 25px; width: 80px; background-color: #66cc99"
    @click="showPopup(viewer)">showpopup</el-button>
  <el-button style="margin-top: 25px; width: 80px; background-color: #66cc99" @click="close()">closepopup</el-button>
  <el-select clearable v-model="data.linban" placeholder="请选择林班" @change="$forceUpdate()" id="select">
    <el-option v-for="item in data.linbans" :key="item.value" :value="item.value">
      <!-- <span>{{ item.value}}</span> -->
    </el-option>
  </el-select>

  <div id="viewer" ref="cesiumContainer"></div>
</template>

<style scoped>
#viewer {
  width: 1600px;
  height: 600px;
}

#select {
  width: 80px;
}
</style>
