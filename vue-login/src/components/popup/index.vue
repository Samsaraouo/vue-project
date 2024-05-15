<script setup>
import "cesium/Build/CesiumUnminified/Widgets/widgets.css";
import { onMounted, ref } from "vue";
import {
    TileMapServiceImageryProvider,
    Viewer,
    Cartesian3,
    Math as cesiumMath,
} from "cesium";
import * as Cesium from "cesium";
import { showpoint, showxb, remove } from "./map_select";
import showPopup from "./pick";
const cesiumContainer = ref();
const viewer = ref();
const tiandituTk = "bf0f37b22a7a08132dc9d5104a708f88";
window.oncontextmenu = function (e) {
    // 取消默认的浏览器自带右键 很重要！！
    e.preventDefault();
};
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
    //只展示部分区域
  var coffeeBeltRectangle = Cesium.Rectangle.fromDegrees(119.8, 28.3, 120.5, 29);
  viewer.value.scene.globe.cartographicLimitRectangle = coffeeBeltRectangle;

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
        duration: 0.5,
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

function handSelect(index, key) {
    switch (index) {
        case "检索类别查找疫木": {
            showpoint(viewer.value, data.linban)
            break;
        }
        case "检索类别查找小班": {
            showxb(viewer.value, data.linban)
            break;
        }
        case "检索类别移除已加载项": {
            remove(viewer.value)
            break;
        }
        case "弹窗显示疫木展示": {
            showPopup(viewer.value)
            break;
        }
        case "弹窗显示关闭弹窗": {
            close()
            break;
        }
    }
}

var data = {
    linban: "",
    linbans: [
        {
            value: "苍岭林场",
        },
        {
            value: "大头坑村",
        },
        {
            value: "金村村",
        },
        {
            value: "岩背村",
        },
        {
            value: "潜明村",
        },
        {
            value: "岱石村",
        },
        {
            value: "八桥村",
        },
        {
            value: "李坑口村",
        },
        {
            value: "和联村",
        },
        {
            value: "胡宅口村",
        },
        {
            value: "沈宅村",
        },
        {
            value: "岩下村",
        },
        {
            value: "双丰村",
        },
        {
            value: "白竹村",
        },
        {
            value: "山河村",
        },
        {
            value: "南顿村",
        },
        {
            value: "金竹村",
        },
        {
            value: "旸村村",
        },
        {
            value: "括苍村",
        },
        {
            value: "坑沿村",
        },
        {
            value: "和美村",
        },
        {
            value: "山传林区",
        },
        {
            value: "杭川村",
        },
        {
            value: "桃源村",
        },
        {
            value: "松岩村",
        },
        {
            value: "吉安村",
        },
        {
            value: "姓汪村",
        },
        {
            value: "大集村",
        },
        {
            value: "五羊湾林区",
        },
        {
            value: "高潮村",
        },
        {
            value: "唐市村",
        },
        {
            value: "苍源村",
        },
        {
            value: "龙溪村",
        },
        {
            value: "林场场部",
        },
        {
            value: "洋溪村",
        },
        {
            value: "泊公坑村",
        },
        {
            value: "清塘林区",
        },
        {
            value: "长兰村",
        },
        {
            value: "壶镇镇林场",
        },
        {
            value: "左库村",
        },
        {
            value: "洪坑岭林区",
        },
        {
            value: "北山村",
        },
        {
            value: "黄畲田村",
        },
        {
            value: "龙川村",
        },
        {
            value: "和睦村",
        },
        {
            value: "上东岸村",
        },
        {
            value: "心畈村",
        },
        {
            value: "向阳林区",
        },
        {
            value: "新深渡村",
        },
        {
            value: "姓叶村",
        },
        {
            value: "赤羊村",
        },
        {
            value: "杨桥头村",
        },
        {
            value: "团结村",
        },
        {
            value: "独山林区",
        },
        {
            value: "大水湖林区",
        },
        {
            value: "西施村",
        },
        {
            value: "青口林区",
        },
        {
            value: "下潜村",
        },
        {
            value: "上王村",
        },
        {
            value: "陇东村",
        },
        {
            value: "苍山村",
        },
        {
            value: "联丰村",
        },
        {
            value: "好溪村",
        },
        {
            value: "滚涛村",
        },
        {
            value: "黄石背村",
        },
        {
            value: "前路村",
        },
        {
            value: "宫前村",
        },
        {
            value: "潜陈村",
        },
        {
            value: "双溪村",
        },
    ],
};

const data1 = ref({
    titleName: "区划检索",
    items: [{
        id: "检索类别",
        children: ["查找疫木", "查找小班", "移除已加载项"]
    },
    {
        id: "弹窗显示",
        children: ["疫木展示", "关闭弹窗"]
    }
    ]
})
</script>

<template>
    <div id="viewer" ref="cesiumContainer">
        <div id="charts">
            <div id="menu">
                <el-select clearable v-model="data.linban" placeholder="请选择村落" @change="$forceUpdate()"
                                id="select">
                                <el-option v-for="item in data.linbans" :key="item.value" :value="item.value">
                                    <span>{{item.value}}</span>
                                </el-option>
                            </el-select>
                <el-row>
                    <el-col>
                        <div class="title">
                            <p class="p"> {{ data1.titleName }} </p>
                        </div>
                    </el-col>
                </el-row>
                <el-menu @select="handSelect" default-active="1" class="el-menu-vertical-demo"
                    background-color="#545c6400" text-color="#fff" :unique-opened="true" active-text-color="#ffd04b"
                    style="max-height: 820px;overflow-y: auto;">
                    <el-sub-menu v-for="(item, index) in data1.items" :index="item.id" :key="index">
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
    </div>
</template>

<style scoped>
#charts {
    position: absolute;
    top: 0;
    left: 0;
    height: 20vh;
    width: 20vw;
    z-index: 100;
}

#viewer {
    height: 88vh;
    width: 100vw;
    position: relative;
    top: 0;
    left: 0;
}
</style>
