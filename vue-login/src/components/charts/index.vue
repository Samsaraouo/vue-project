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
import chart1 from "./chart1.vue";
import chart2 from "./chart2.vue";
import chart3 from "./chart3.vue";
import chart4 from "./chart4.vue";
import * as Cesium from "cesium";

const cesiumContainer = ref();
const viewer = ref();
const tiandituTk = "bf0f37b22a7a08132dc9d5104a708f88";
window.CESIUM_BASE_URL = "node_modules/cesium/Build/CesiumUnminified/";
window.oncontextmenu = function (e) {
  // 取消默认的浏览器自带右键 很重要！！
  e.preventDefault();
};
window.Cesium = Cesium;
let ditu;
let yingxiang;
let yimu;
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
  //只展示部分区域
  var coffeeBeltRectangle = Cesium.Rectangle.fromDegrees(119.8, 28.3, 120.5, 29);
  viewer.value.scene.globe.cartographicLimitRectangle = coffeeBeltRectangle;
  
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
  ditu = viewer.value.imageryLayers.addImageryProvider(
    new Cesium.WebMapTileServiceImageryProvider({
      url: 'http://t0.tianditu.gov.cn/img_w/wmts?tk=' + tiandituTk,
      layer: 'img',
      style: 'default',
      format: 'tiles',
      tileMatrixSetID: 'w',
      maximumLevel: 18,
      credit: new Cesium.Credit('© Tianditu', 'http://www.tianditu.gov.cn/')

    })
  )
  viewer.value.terrainProvider = await Cesium.CesiumTerrainProvider.fromUrl(
    "http://localhost:8802/terrain/"
  );

  yingxiang = viewer.value.imageryLayers.addImageryProvider(
    new Cesium.UrlTemplateImageryProvider({
      url: "http://localhost:8802/pyramid/{z}/{x}/{y}.png",
      maximumLevel: 21,
      rectangle: Cesium.Rectangle.fromDegrees(
        120.2181,
        28.7958,
        120.4203,
        28.954
      ),
    })
  );
  yimu = viewer.value.imageryLayers.addImageryProvider(
    new Cesium.WebMapServiceImageryProvider({
      url: 'http://localhost:8080/geoserver/yimu/wms',
      layers: 'yimu:yimu1',
      parameters: {
        service: "WMS",
        format: "image/png",
        transparent: true,
      },
    })
  )
  let imageLayer_xiaoban = viewer.value.imageryLayers.addImageryProvider(
    new Cesium.WebMapServiceImageryProvider({
      url: 'http://localhost:8080/geoserver/yimu/wms',
      layers: 'yimu:xiaoban',
      parameters: {
        service: "WMS",
        format: "image/png",
        transparent: true,
      },
    })
  )
  viewer.value.scene.postRender.addEventListener(function () {
    let cameraHeight = viewer.value.camera.positionCartographic.height;
    if (cameraHeight > 4000) {
      imageLayer_xiaoban.show = false;  // 当缩放级别小于10时，隐藏图层
    } else {
      imageLayer_xiaoban.show = true;  // 当缩放级别大于或等于10时，显示图层
    }
  });
  viewer.value.camera.flyTo({
    destination: Cartesian3.fromDegrees(120.3, 28.8, 1000),
    orientation: {
      heading: cesiumMath.toRadians(0.0),
      pitch: cesiumMath.toRadians(-60.0),
    },
    duration: 0.5,
  });
});
function handSelect(index, key) {
    switch (index) {
        case "选择图层底图": {
            ditu.show = !ditu.show;
            break;
        }
        case "选择图层遥感影像": {
            yingxiang.show = !yingxiang.show;
            break;
        }
        case "选择图层疫木": {
            yimu.show = !yimu.show;
            break;
        }
    }
}
const data = ref({
    titleName: "图层展示",
    items: [{
        id: "选择图层",
        children: ["底图", "遥感影像", "疫木"]
    },
    ]
})
</script>

<template>
  <div id="chart1">
    <chart1></chart1>
    <chart2></chart2>
  </div>
  <div id="viewer" ref="cesiumContainer"><div id="charts">
            <div id="menu">
                <el-row>
                    <el-col>
                        <div class="title">
                            <p class="p"> {{ data.titleName }} </p>
                        </div>
                    </el-col>
                </el-row>
                <el-menu @select="handSelect" default-active="1" class="el-menu-vertical-demo"
                    background-color="#545c6400" text-color="#fff" :unique-opened="true" active-text-color="#ffd04b"
                    style="max-height: 820px;overflow-y: auto;">
                    <el-sub-menu v-for="(item, index) in data.items" :index="item.id" :key="index">
                        <template #title>
                            <el-icon>
                                <location />
                            </el-icon>
                            <span>{{ item.id }}</span>
                        </template>
                        <el-menu-item v-for="(itemc, index) in item.children" :index="item.id + itemc" :key="index">
                            <el-icon>
                                <Document />
                            </el-icon>
                            {{ itemc }}
                        </el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </div>
        </div></div>
  <div id="pie">
    <!-- <el-select></el-select> -->
    <chart4></chart4>
  </div>
  <div id="chart2">
    <chart3></chart3>
  </div>
</template>

<style scoped>
#chart1 {
  position: absolute;
  left: 0%;
  width: 24%;
  margin-left: auto;
  margin-right: auto;
}

#chart2 {
  position: absolute;
  right: 0%;
  top: 300px;
  width: 24%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

#pie {
  position: absolute;
  right: 0%;
  width: 24%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

#viewer {
  width: 50%;
  height: 88vh;
  position: absolute;
  top: 0;
  left: 25%;
  margin-left: auto;
  margin-right: auto;
}

#charts {
    position: absolute;
    top: 0;
    left: 0;
    height: 20vh;
    width: 20vw;
    z-index: 100;
}
</style>
