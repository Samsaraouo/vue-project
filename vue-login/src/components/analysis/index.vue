<script setup>
import "cesium/Build/CesiumUnminified/Widgets/widgets.css";
import { onMounted, ref } from "vue";
import axios from "axios";
import * as Vue from 'vue'
import {
    TileMapServiceImageryProvider,
    Viewer,
    Cartesian3,
    Math as cesiumMath,
} from "cesium";
import * as Cesium from "cesium";
import { drawRectangle, drawPolygon, drawCircle, clearDraw } from "./draw1"
import { generatePolygonSQL } from "./create_polygon";
// import TipVue from '../analysis/Tip.vue'
const tiandituTk = "bf0f37b22a7a08132dc9d5104a708f88";
window.CESIUM_BASE_URL = "node_modules/cesium/Build/CesiumUnminified/";
window.oncontextmenu = function (e) {
    // 取消默认的浏览器自带右键 很重要！！
    e.preventDefault();
};
let viewer = ref(null);
window.Cesium = Cesium;
onMounted(async () => {
    // const loading = ElLoading.service({
    //   lock: false,
    //   text: "地图拼命加载中...",
    //   background: "#00000011",
    //   target: cesiumContainer.value
    // });
    bindEventListener();
    viewer.value = new Viewer("cesiumContainer", {
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
            url: 'http://t0.tianditu.gov.cn/img_w/wmts?tk=' + tiandituTk,
            layer: 'img',
            style: 'default',
            format: 'tiles',
            tileMatrixSetID: 'w',
            maximumLevel: 18,
            credit: new Cesium.Credit('© Tianditu', 'http://www.tianditu.gov.cn/')

        })
    )
    // viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
    //   url: "http://localhost:8802/terrain/",
    //   requestVertexNormals: true,
    // });

    viewer.value.terrainProvider.readyPromise.then(() => {
        axios({
            method: "GET",
            url: "get_points/",
        }).then((Response) => {
            let json = Response.data;
            const billboards = viewer.value.scene.primitives.add(
                new Cesium.BillboardCollection()
            );
            for (let point of json) {
                billboards.add({
                    position: Cesium.Cartesian3.fromDegrees(point[0], point[1]),
                    image: "src/components/analysis/pine.png", // 你需要指定一个图片来表示点
                    // heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                });
            }
        });
    });
    // viewer.imageryLayers.addImageryProvider(
    //   new Cesium.UrlTemplateImageryProvider({
    //     url: "http://localhost:8802/pyramid/{z}/{x}/{y}.png",
    //     maximumLevel: 21,
    //     rectangle: Cesium.Rectangle.fromDegrees(
    //       120.2181,
    //       28.7958,
    //       120.4203,
    //       28.954
    //     ),
    //   })
    // );
    var coffeeBeltRectangle = Cesium.Rectangle.fromDegrees(119.8, 28.3, 120.5, 29);

    viewer.value.scene.globe.cartographicLimitRectangle = coffeeBeltRectangle;

    // viewer.imageryLayers.addImageryProvider(
    //   new Cesium.WebMapServiceImageryProvider({
    //     url: 'http://localhost:8080/geoserver/yimu/wms',
    //     layers: 'yimu:yimu1',
    //     parameters: {
    //           service: "WMS",
    //           format: "image/png",
    //           transparent: true,
    //       },
    //   })
    // )
    viewer.value.camera.flyTo({
        destination: Cartesian3.fromDegrees(120.3, 28.8, 10000),
        orientation: {
            heading: cesiumMath.toRadians(0.0),
            pitch: cesiumMath.toRadians(-60.0),
        },
        duration: 1,
    });

});
let entity = null;
let handler = null;
let positions = null;
function drawRectangle1() {
    document.getElementById('chart').style.display = 'block';
    let result = drawRectangle(viewer.value, handler, positions, entity)
    positions = result.rectangle1;

    // let tip = document.createElement('div');
    // tip.style.position = 'absolute';
    // tip.style.top = '0';
    // tip.style.left = '0'; // Set the left position to 0
    // tip.style.padding = '5px';
    // tip.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    // tip.style.color = '#fff';
    // tip.style.fontFamily = 'Arial, sans-serif';
    // tip.style.fontSize = '12px';
    // tip.innerText = '左键单击开始绘图';

    // viewer.value.container.appendChild(tip);

    // viewer.value.container.addEventListener('mousemove', (e) => {
    //     const rect = viewer.value.container.getBoundingClientRect();
    //     const mouseX = e.clientX - rect.left;
    //     const mouseY = e.clientY - rect.top;

    //     if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
    //         tip.style.display = 'block';
    //         tip.style.top = `${mouseY}px`;
    //         tip.style.left = `${mouseX}px`; // Update the left position based on the mouse position
    //     } else {
    //         tip.style.display = 'none';
    //     }
    // });

    // viewer.value.container.addEventListener('click', () => {
    //     tip.innerText = '左键双击完成绘图';
    // });

    // viewer.value.container.addEventListener('dblclick', () => {
    //     viewer.value.container.removeChild(tip);
    // });
}
function drawPolygon1() {
    document.getElementById('chart').style.display = 'block';
    const result = drawPolygon(viewer.value, handler, positions, entity);
    positions = result.positions;

    // let tip = document.createElement('div');
    // tip.style.position = 'absolute';
    // tip.style.top = '0';
    // tip.style.left = '0'; // Set the left position to 0
    // tip.style.padding = '5px';
    // tip.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    // tip.style.color = '#fff';
    // tip.style.fontFamily = 'Arial, sans-serif';
    // tip.style.fontSize = '12px';
    // tip.innerText = '左键单击开始绘图';

    // document.getElementById('cesiumContainer').appendChild(tip);

    // viewer.value.container.addEventListener('mousemove', (e) => {
    //     const rect = viewer.value.container.getBoundingClientRect();
    //     const mouseX = e.clientX - rect.left;
    //     const mouseY = e.clientY - rect.top;

    //     if (mouseX >= 0 && mouseX <= rect.width && mouseY >= 0 && mouseY <= rect.height) {
    //         tip.style.display = 'block';
    //         tip.style.top = `${mouseY}px`;
    //         tip.style.left = `${mouseX}px`; // Update the left position based on the mouse position
    //     } else {
    //         tip.style.display = 'none';
    //     }
    // });


    // viewer.value.container.addEventListener('click', () => {
    //     tip.innerText = '左键双击完成绘图';
    // });

    // viewer.value.container.addEventListener('dblclick', () => {
    //     viewer.value.container.removeChild(tip);
    // });
}
function drawCircle1() {
    const result = drawCircle(viewer.value, handler, positions, entity);
    positions = result.positions;
}

function clearDraw1() {
    clearDraw(this.handler, this.entity, this.viewer, this.positions)
}
function getCharts(selected) {
    console.log(positions);
    const positionsInDegrees = positions.map(position => {
        const cartographic = Cesium.Cartographic.fromCartesian(position);
        console.log(cartographic);
        const longitude = Cesium.Math.toDegrees(cartographic.longitude);
        const latitude = Cesium.Math.toDegrees(cartographic.latitude);
        return [longitude, latitude];
    });
    // let positionsString = JSON.stringify(positionsInDegrees);
    // const firstPosition = positionsInDegrees[0];
    // positionsString += JSON.stringify(firstPosition);
    // console.log(positionsString);
    let res = generatePolygonSQL(positionsInDegrees, selected);
}
function handSelect(index, key) {
    switch (index) {
        case "图像绘画矩形绘制": {
            console.log("矩形绘制");
            drawRectangle1();
            break;
        }
        case "图像绘画多边形绘制": {
            console.log("多边形绘制");
            drawPolygon1();
            break;
        }
        case "图像绘画圆形绘制": {
            console.log("圆形绘制");
            drawCircle1();
            break;

        }
        case "图表展示林班占比图": {
            console.log("林班占比图");
            getCharts("0001");
            break;
        }
        case "图表展示地类占比图": {
            console.log("林班占比图");
            getCharts("0003");
            break;
        }
        case "图表展示海拔分布图": {
            console.log("海拔分布图");
            getCharts("0004");
            break;
        }
        case "图表展示村占比图": {
            console.log("村占比图");
            getCharts("0005");
            break;
        }
        case "图表展示胸径分布图": {
            console.log("胸径分布图");
            getCharts("0006");
            break;
        }
        case "图表展示树高分布图": {
            console.log("树高分布图");
            getCharts("0007");
            break;
        }
    }
}
const data = ref({
    titleName: "分析",
    items: [{
        id: "图像绘画",
        children: ["矩形绘制", "多边形绘制", "圆形绘制"]
    },
    {
        id: "图表展示",
        children: ["林班占比图", "地类占比图", "海拔分布图", "村占比图", "胸径分布图", "树高分布图"]
    }
    ]
})
function bindEventListener(){
  var icon = document.getElementById('icon');
  var charts = document.getElementById('charts');
  if (icon && charts) {
  charts.style.width = '0vw';
  charts.style.overflow = 'hidden';

  var isOpen = false;  // 用于跟踪charts的状态

  icon.addEventListener('click', function() {
    if (!isOpen) {
      this.classList.remove('fa-arrow-right');
      this.classList.add('fa-arrow-left');
      charts.style.width = '20vw';
      isOpen = true;
    } else {
      this.classList.remove('fa-arrow-left');
      this.classList.add('fa-arrow-right');
      charts.style.width = '0vw';
      isOpen = false;
    }
  });
}};
</script>

<template>
    <div id="cesiumContainer">
        <div id="charts" >
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
        </div>
        <el-icon id="icon" class="fas fa-arrow-right">
                                <arrow-right />
                            </el-icon>
        <div id="chart">
        </div>
    </div>

</template>
<style>
#charts {
    position: absolute;
    top: 0;
    left: 0;
    /* height: 20vh; */
    overflow: hidden;
    width: 0vw;
    z-index: 10;
    transition: all 0.5s ease;
}

#icon {
  position: absolute;
  left: 0;
  cursor: pointer;
  z-index: 20;
  font-size: 50px;
}

#chart {
    background-color: rgba(0, 0, 0, 0.65);
    position: absolute;
    top: 0;
    right: 0;
    height: 60vh;
    width: 30vw;
    z-index: 10;
    display: none;
    
    /* opacity: 0.5; */
}

.button-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.button {
    color: white !important;
    background-color: darkslategray !important;
}

#cesiumContainer {
    height: 88vh;
    width: 100vw;
    position: relative;
    top: 0;
    left: 0;
}

.title {
    background-size: 50% 100%;
    background-repeat: no-repeat;
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
</style>