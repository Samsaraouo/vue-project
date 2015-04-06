<script setup>
import {onMounted, ref} from "vue";
import {loadGeojson, loadGeojsonLine} from "@/pages/dlem/js/loadGeojson.js";
import * as Cesium from "cesium";
import {
  Cartesian3,
  Math as cesiumMath,
  ScreenSpaceEventType,
  Viewer
} from "cesium";
import {CloseBold, Filter, MagicStick, Memo, PieChart, Refresh} from "@element-plus/icons-vue";
import {getColorAsRgb} from "@/pages/dlem/js/getColor.js";
import {getTypeTwo} from "@/services/api.js";
import {ElLoading} from "element-plus";
import {destroyBoxSelection, setBoxSelection} from "@/pages/dlem/js/boxSelection.js";
import {hidePopup, showPopup} from "@/pages/dlem/js/popup.js";
import EE from "@/components/util/emitter.js";
// window.CESIUM_BASE_URL = 'target';
window.oncontextmenu = function (e) {
  // 取消默认的浏览器自带右键 很重要！！
  e.preventDefault();
};
const tiandituTk = "2d009bafe1ddd1a85851ebf62450bafb"
const tdtUrl = "http://t{s}.tianditu.gov.cn/";
const subdomains = ["1", "2", "3", "4", "5", "6", "7"]
const viewer = ref()
window.Cesium = Cesium
onMounted(async () => {
  // const imgc = new Cesium.WebMapTileServiceImageryProvider({
  //   url: tdtUrl + 'img_w/wmts?tk=' + tiandituTk,
  //   layer : 'img',
  //   style : 'default',
  //   format : 'image/jpeg',
  //   tileMatrixSetID : 'w',
  //   subdomains: subdomains,
  //   tilingScheme:new Cesium.WebMercatorTilingScheme(),
  //   // tileMatrixLabels : ['default028mm:0', 'default028mm:1', 'default028mm:2' ...],
  //   maximumLevel: 17,
  //   credit : new Cesium.Credit('U. S. Geological Survey')
  // })

  const loading = ElLoading.service({
    lock: false,
    text: "地图拼命加载中...",
    background: "#00000011",
    target: cesiumContainer.value
  });
  viewer.value = new Viewer(cesiumContainer.value, {
    // baseLayer: new Cesium.ImageryLayer(
    //     new Cesium.WebMapTileServiceImageryProvider({
    //       url: "http://t{s}.tianditu.gov.cn/img_w/wmts?tk=8b62917c34293a373a41bf66789dbb8f",
    //       layer: 'img',
    //       subdomains: [0, 1, 2, 3, 4, 5, 6, 7],
    //       style: 'default',
    //       maximumLevel: 10,
    //       tileMatrixSetID: "w"
    //     })),
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
  });
  // Globe 对象
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
  //     new Cesium.WebMapTileServiceImageryProvider({
  //       url: "http://t{s}.tianditu.gov.cn/img_w/wmts?tk=" + tiandituTk,
  //       layer: 'img',
  //       subdomains: [0, 1, 2, 3, 4, 5, 6, 7],
  //       style: 'default',
  //       maximumLevel: 10,
  //       tileMatrixSetID: "w"
  //     })
  // )
  viewer.value.imageryLayers.addImageryProvider(
      new Cesium.UrlTemplateImageryProvider({
        url: "http://121.43.40.232:8091/map/img/{z}/{x}/{y}.png",
        maximumLevel: 16,
        rectangle: Cesium.Rectangle.fromDegrees(119.2580348253250122, 30.2862757444381714, 119.5346456766128540, 30.4207187891006470)
      })
  )
  // viewer.value.imageryLayers.addImageryProvider(
  //     new Cesium.WebMapTileServiceImageryProvider({
  //       url: "http://t{s}.tianditu.gov.cn/cia_w/wmts?tk=" + tiandituTk,
  //       layer: 'cia',
  //       subdomains: [0, 1, 2, 3, 4, 5, 6, 7],
  //       style: 'default',
  //       maximumLevel: 18,
  //       tileMatrixSetID: "w"
  //     })
  // )
  viewer.value.camera.percentageChanged = 0;
  // viewer.scene.screenSpaceCameraController._minimumZoomRate = 50000; // 设置相机缩小时的速率
  // viewer.scene.screenSpaceCameraController._maximumZoomRate = 50000   //设置相机放大时的速率
  // viewer.imageryLayers.addImageryProvider(imgc)

  // 隐藏(true)or显示(fasle)在地形之下的entity
  viewer.value.scene.globe.depthTestAgainstTerrain = true;

  // const buildingTileset = await createOsmBuildingsAsync();
  viewer.value._cesiumWidget._creditContainer.style.display = "none";
  // viewer.imageryLayers.removeAll()
  // viewer.value.terrainProvider = await createWorldTerrainAsync({
  //   requestWaterMask: true,
  //   requestVertexNormals: true,
  // });
  viewer.value.terrainProvider = await Cesium.CesiumTerrainProvider.fromUrl(
      "http://121.43.40.232:8091/terrain/swdx/"
  );
  viewer.value.cesiumWidget.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  // 添加瓦片加载监听器
  viewer.value.camera.flyTo({
    destination: Cartesian3.fromDegrees(119.45764082208967, 30.31493466481967, 3000),
    orientation: {
      heading: cesiumMath.toRadians(0.0),
      pitch: cesiumMath.toRadians(-60.0),
    },
    duration: 3
  });
  setTimeout(async () => {
    await loadGeojsonLine(viewer.value, {
      url: window.config.baseURL + "/tst/onemap/getVector",
      name: "xiaoban",
      isElevating: false
    })
  }, 3000)
  let inter = setInterval(() => {
    if (!viewer.value.dataSources.getByName("xiaoban")[0]?.isLoading) {
      clearInterval(inter)
      loading.close();
    }
  });
})
const popup = ref({
  visible: false,
  position: {},
  properties: {}
})
const cesiumContainer = ref()
const legendList = ref()
onMounted(async () => {
  legendList.value = (await getTypeTwo()).data.map((item) => {
        return {
          ...item,
          color: getColorAsRgb(item.type_two)
        }
      }
  )
})

function handleBlock(item) {
  // setColorHidden(viewer.value,item.label)
  // if (!item?.hidden) {
  //   item.hidden = true
  //   document.getElementById(item.label).setAttribute("style", `background-color: rgba(0,0,0,0); border-color: ${item.color}`);
  // } else {
  //   item.hidden = false
  //   document.getElementById(item.label).setAttribute("style", `background-color: ${item.color}; border-color: ${item.color}`);
  // }

}

const LegendShow = ref(false)
EE.on("setPopup",(popupData)=>{
  popup.value = popupData
})
function showMemo() {
  if (LegendShow.value) {
    document.getElementById("Memo").setAttribute("style", 'color: #fff')
    hidePopup(viewer.value)
    viewer.value.dataSources.getByName("xiaobanColor")[0].show=false
    // loadGeojsonLine(viewer.value, {
    //   url: window.config.baseURL + "/tst/onemap/getVector",
    //   name: "xiaoban",
    //   isElevating: false
    // })
  } else {
    document.getElementById("Memo").setAttribute("style", 'color: #3366ff')
    showPopup(viewer.value)
    // viewer.value.dataSources.remove(viewer.value.dataSources.getByName("xiaoban")[0])
    if(viewer.value.dataSources.getByName("xiaobanColor")[0]){
      viewer.value.dataSources.getByName("xiaobanColor")[0].show=true
    }else{
      loadGeojson(viewer.value, {
        url: window.config.baseURL + "/tst/onemap/getVector",
        name: "xiaobanColor",
        isElevating: false
      })
    }
  }
  LegendShow.value = !LegendShow.value
}

const isSelectBox = ref(false)

function selectBox() {
  isSelectBox.value = !isSelectBox.value
  console.log("selectBox is ", isSelectBox.value)
  if (isSelectBox.value) {
    document.getElementById("selectBox").setAttribute("style", 'color: #3366ff')
    setBoxSelection(viewer.value)
  } else {
    document.getElementById("selectBox").setAttribute("style", 'color: #fff')
    destroyBoxSelection(viewer.value)
  }
}
</script>

<template>
  <div class="map" ref="cesiumContainer" style="overflow: hidden"></div>
  <div class="tools" ref="tools">
    <el-row>
      <el-tooltip
          class="box-item"
          effect="light"
          content="分析"
          placement="bottom"
      >
        <el-icon>
          <PieChart @click="selectBox" id="selectBox"/>
        </el-icon>
      </el-tooltip>
      <el-divider direction="vertical" border-style="dashed"/>
      <el-tooltip
          class="box-item"
          effect="light"
          content="图层管理"
          placement="bottom"
      >
        <el-icon>
          <Filter/>
        </el-icon>
      </el-tooltip>
      <el-divider direction="vertical" border-style="dashed"/>
      <el-tooltip
          class="box-item"
          effect="light"
          content="图例"
          placement="bottom"
      >
        <el-icon>
          <Memo @click="showMemo" id="Memo"/>
        </el-icon>
      </el-tooltip>
      <el-divider direction="vertical" border-style="dashed"/>
      <el-tooltip
          class="box-item"
          effect="light"
          content="涂色"
          placement="bottom"
      >
        <el-icon>
          <MagicStick/>
        </el-icon>
      </el-tooltip>
      <el-divider direction="vertical" border-style="dashed"/>
      <el-tooltip
          class="box-item"
          effect="light"
          content="复位"
          placement="bottom"
      >
        <el-icon>
          <Refresh/>
        </el-icon>
      </el-tooltip>
      <el-divider direction="vertical" border-style="dashed"/>
      <el-tooltip
          class="box-item"
          effect="light"
          content="关闭"
          placement="bottom"
      >
        <el-icon>
          <CloseBold/>
        </el-icon>
      </el-tooltip>
    </el-row>
  </div>
  <div ref="legend" class="legend" v-show="LegendShow">
    <div class="title">优势树种</div>
    <div ref="legend-cell" v-for="item in legendList">
      <div class="block-group">
        <div ref="block" :id="item.type_two" class="block" :style="{backgroundColor:item.color, borderColor:item.color}"
             @click="handleBlock(item)">
        </div>
        <div ref="label" class="label">{{ item.type_two }}</div>
      </div>

    </div>
  </div>
  <el-card id="card" v-show="popup.visible" class="box-card">
    <template v-if="popup.properties">
      <h3 class="h3">小班信息</h3>
      <!--      <div class="row" v-for="(val, key) in popup.properties">-->
      <!--        <div class="value">{{ key }}:</div>-->
      <!--        <div class="label">{{ val }}</div>-->
      <!--      </div>-->
      <div>
        <el-row v-for="(val, key) in popup.properties">
          <el-col :span="11" style="text-align: right;" class="col"><p class="p1">{{ key }}</p></el-col>
          <el-col :span="2" style="text-align: center"></el-col>
          <el-col :span="11" style="text-align: left;" class="col"><p class="p2">{{ val }}</p></el-col>
        </el-row>
      </div>
    </template>
  </el-card>
</template>

<style scoped lang="scss">
.map {
  height: calc(100% - 2vmin);
  width: 100%;
  box-sizing: border-box;
  margin: .5vmax;
  background-color: #00ffff00;
  filter: drop-shadow(5px 5px 2px #274847);

}

.tools {
  position: absolute;
  color: white;
  margin: 1vmax;
  padding: 5px;
  background-color: #3a939388;
  filter: drop-shadow(.5vmin .5vmin .2vmin #000000);
  border-radius: .2cqw;

  .box-item {
    text-shadow: 1vmin 1vmin .4vmin #1e1d1d;
  }
}

.legend {
  position: absolute;
  color: white;
  margin: 1vmax;
  top: 5cqh;
  background-color: #3a939388;
  max-height: 40cqmin;
  padding: 10px;
  //width: 10cqw;
  overflow: auto;
  border-radius: 5px;
  filter: drop-shadow(5px 5px 2px #000000);

  .title {
    margin-left: 20px;
  }

  .block-group {
    display: flex;
    margin-right: 20px;

    .block {
      width: 30px;
      height: 20px;
      border-style: solid;
      border-width: 1px;
      margin: 3px 20px;
      filter: drop-shadow(5px 5px 2px #030303);
    }
  }
}

.legend::-webkit-scrollbar {
  display: none;
}

.box-card {
  position: absolute;
  z-index: 10;
  width: 30cqh;
  background-color: rgba(51, 164, 163, 0.4);
  border: none;
  border-radius: 30px 36px 36px 0;
  filter: drop-shadow(5px 5px 2px #000000);


  .h3 {
    margin-top: 0;
    color: white;
    font: normal bold 2cqh arial, sans-serif;
  }

  .col {
    .p1 {
      padding: .5cqh 0 0 0;
      margin: 0;
      color: #a4d79e;
      font: normal bold 1.5cqh arial, sans-serif;
      text-shadow: 3px 4px 2px #2f2b2b;

    }

    .p2 {
      padding: .5cqw 0 0 0;
      margin: 0;
      color: #eccc7c;
      font: italic 1.5cqh arial, sans-serif;
      text-shadow: 3px 4px 2px #2f2b2b;

    }
  }
}
</style>
