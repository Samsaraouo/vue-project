<script setup>
import {onMounted, ref} from "vue";
import * as Cesium from "cesium";
import {loadImage} from "@/components/map/js/loadImage.js";
const props = defineProps({
  urls:Array
})

onMounted(async () => {

  const viewer = new Cesium.Viewer(cesiumContainer.value, {
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
    requestRenderMode: true,
  });
  viewer.camera.percentageChanged = 0;

  // 隐藏(true)or显示(fasle)在地形之下的entity
  viewer.scene.globe.depthTestAgainstTerrain = true;

  viewer._cesiumWidget._creditContainer.style.display = "none";
  // viewer.terrainProvider = await Cesium.createWorldTerrainAsync({
  //   requestWaterMask: true,
  //   requestVertexNormals: true,
  // });
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  let helper = new Cesium.EventHelper();
  // 添加瓦片加载监听器
  helper.add(viewer.scene.globe.tileLoadProgressEvent, (e) => {
    if (e === 0) {
      // viewer.camera.flyTo({
      //   destination: Cesium.Cartesian3.fromDegrees(119.471377, 30.324768, 3000),
      //   orientation: {
      //     heading: Cesium.Math.toRadians(0.0),
      //     pitch: Cesium.Math.toRadians(-90.0),
      //   },
      //   duration: 3
      // });
      helper.removeAll();
      let img;
      for (let i = 0; i < props.urls.length; i++) {
        img = loadImage(viewer,props.urls[i])
        viewer.imageryLayers.addImageryProvider(img)
      }
      console.log(props.urls)
      setTimeout(async () => {
        // await viewer.flyTo(img, {
        //   duration: 3
        // })
      }, 3000)
    }
  });

})
const cesiumContainer = ref()
</script>

<template>
  <div class="map" ref="cesiumContainer"></div>
</template>

<style scoped lang="scss">
.map {
  height: calc(100% - 20px);
  width: 100%;
  box-sizing: border-box;
  margin: 10px;
  background-color: #00ffff00;
  filter: drop-shadow(5px 5px 2px #274847);
}

.box-card {
  position: absolute;
  z-index: 10;
  width: 300px;

  .h3 {
    margin-top: 0;
  }

  .row {
    display: flex;
    margin-bottom: 6px;

    .label {
      flex: 0 0 80px;
      color: #999999;
      text-align: right;
      padding-right: 12px;
    }

    .value {
      color: #333333;
    }
  }
}
</style>