<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { TileMapServiceImageryProvider, Viewer, buildModuleUrl } from 'cesium'
import 'cesium/Build/CesiumUnminified/Widgets/widgets.css'

const viewerDivRef = ref<HTMLDivElement>()
window.CESIUM_BASE_URL = 'node_modules/cesium/Build/CesiumUnminified/'

onMounted(() => {
  new Viewer(viewerDivRef.value as HTMLElement, {
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
    imageryProvider: new TileMapServiceImageryProvider({
      url: 'node_modules/cesium/Build/CesiumUnminified/Assets/Textures/NaturalEarthII',
    })
  })
})
</script>

<template>
  <div id="cesium-viewer" ref="viewerDivRef"></div>
</template>

<style scoped>
#cesium-viewer {
  width: 800px;
  height: 400px;
}
</style>