<script setup>
import 'cesium/Build/CesiumUnminified/Widgets/widgets.css'
import { onMounted, ref, } from 'vue'
import { TileMapServiceImageryProvider, Viewer, Cartesian3, Math as cesiumMath} from 'cesium'
import * as Cesium from "cesium";
import axios from 'axios'



const cesiumContainer = ref()
const viewer = ref()
const tiandituTk = 'bf0f37b22a7a08132dc9d5104a708f88'
window.CESIUM_BASE_URL = 'node_modules/cesium/Build/CesiumUnminified/'
window.oncontextmenu = function (e) {
  // 取消默认的浏览器自带右键 很重要！！
  e.preventDefault();
};
window.Cesium = Cesium
onMounted(() => {
  // const loading = ElLoading.service({
  //   lock: false,
  //   text: "地图拼命加载中...",
  //   background: "#00000011",
  //   target: cesiumContainer.value
  // });
  viewer.value = new Viewer(cesiumContainer.value , {
    baseLayer: false,
    animation: false,
    baseLayerPicker: false,
    fullscreenButton: false,
    vrButton: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false,//点击功能
    timeline: false,
    navigationHelpButton: false,
    requestRenderMode: false,
    imageryProvider: new TileMapServiceImageryProvider({
      url: 'node_modules/cesium/Build/CesiumUnminified/Assets/Textures/NaturalEarthII',
    })
  })
  let globe = viewer.value.scene.globe;
  // 一定要为 true，否则 undergroundColor 设置无效
  globe.translucency.enabled = true;
  // 基础色透明，默认是蓝色 Cesium.Color.BLUE
  //   globe.baseColor = Cesium.Color.TRANSPARENT;
  // 地下色透明，默认是黑色 Cesium.Color.BLACK
  globe.undergroundColor = Cesium.Color.TRANSPARENT;
  // 隐藏天空大气层，否则最外围有一圈
  viewer.value.scene.skyAtmosphere.show = false;
    viewer.value.imageryLayers.addImageryProvider(
      new Cesium.WebMapTileServiceImageryProvider({
        url: "http://t{s}.tianditu.gov.cn/cia_w/wmts?tk=" + tiandituTk,
        layer: 'cia',
        subdomains: [0, 1, 2, 3, 4, 5, 6, 7],
        style: 'default',
        maximumLevel: 18,
        tileMatrixSetID: "w"
      })
    )
  viewer.value.camera.flyTo({
    destination: Cartesian3.fromDegrees(120.295535, 28.871887, 3000),
    orientation: {
      heading: cesiumMath.toRadians(0.0),
      pitch: cesiumMath.toRadians(-60.0),
    },
    duration: 3
  });
  // viewer.value.imageryLayers.addImageryProvider(
  //   new Cesium.ArcGisMapServerImageryProvider({
  //     url : 'https://localhost:6443/arcgis/services/huzhen/MapServer/WmsServer?'
  //   })
  // )
  
})


</script>

<template>
  <div id="viewer" ref="cesiumContainer">
    
  </div>
  
</template>

<style scoped>
#viewer {
  width: 800px;
  height: 400px;
}

</style>