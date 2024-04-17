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
import { get_yimu } from "./get_all_yimu";

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
      url : 'http://t0.tianditu.gov.cn/img_w/wmts?tk='+tiandituTk,
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

  // viewer.value.imageryLayers.addImageryProvider(
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

  viewer.value.imageryLayers.addImageryProvider(
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
  viewer.value.camera.flyTo({
    destination: Cartesian3.fromDegrees(120.3, 28.8, 10000),
    orientation: {
      heading: cesiumMath.toRadians(0.0),
      pitch: cesiumMath.toRadians(-60.0),
    },
    duration: 3,
  });








// const json = 'http://localhost:8802/yimu/yimu.geojson'
// await Cesium.GeoJsonDataSource.load(json).then(function(dataSource) {
//       // dataSource.process(json,{
//       // clampToGround: true
//       // })
//       viewer.value.dataSources.add(dataSource);
//       var entities = dataSource.entities.values;
//       labelArr.push(obj)
//       var labelArr = ''
//         for (var i = 0; i < entities.length; i++) {
//           var entity = entities[i];
//           var obj = [entity.geometry.coordinates[0],entity.geometry.coordinates[1]];
//           labelArr = labelArr + obj;
//           entity.billboard = undefined;
//           entity.point = new Cesium.PointGraphics({
//           color: Cesium.Color.RED,
//           pixelSize: 10,
//           heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
          
//           });
//         }
//     });

// 获取当前正在渲染的瓦片集合
// const tilesToRender =viewer.value.scene.globe._surface._tilesToRender

/**
 * 添加相机移动结束事件，也就是鼠标移动结束事件
 * 由于相机自身有惯性，所以提前关闭惯性会有更好的体验
 * 但是这本身并不影响该功能
 * */
// await viewer.value.camera.moveEnd.addEventListener(()=>{

//     // 当前正在渲染的瓦片求并集为一个大的rectangle
//     let renderRectangle = new Cesium.Rectangle()
    
//     if( tilesToRender.length > 0 ) {

//         // 初始化总的渲染的矩形瓦片
//         Cesium.Rectangle.clone(tilesToRender[0].rectangle,renderRectangle)

//         let num = 0

//         tilesToRender.forEach(item => {

//             /**
//              * 获取当前层级大于等于12级的瓦片，该处可自定，具体层级可根据加载的实体多少决定
//              * 一般情况下由于相机视角的不同，我们能看见的瓦片数量也不同，所以尽量考虑瓦片数量
//              * 最多的情况下每块瓦片上的显示数量
//             */
//             if( item.level >= 15 ) {
//                 // 用来判断当前是否有符合条件的瓦片正在渲染
//                 num += 1
//                 // 所有大于15级的瓦片求交集
//                 Cesium.Rectangle.union(item.rectangle, renderRectangle, renderRectangle)
//             }
//         })
//         if( num > 0 ){
//             // 判断点是否在所需渲染的瓦片内
//             for( let i = 0; i < entities.length; i++ ) {
//                 // 将度转为弧度
//                 let cartographic = Cesium.Cartographic.fromDegrees(labelArr[i][0], labelArr[i][1])
//                 // 判断点是否在矩形内
//                 if(Cesium.Rectangle.contains(renderRectangle,cartographic)){
//                     // 判断当前实体是否已经被加载，有则跳过，无则加载
//                     if(viewer.value.entities.contains(entities[i])) continue
//                     viewer.value.entities.add(entities[i])
//                 } else {
//                     // 不在点内，则判断是否被加载，有则删除
//                     if(viewer.value.entities.contains(entities[i])){
//                         viewer.value.entities.remove(entities[i])
//                     }

//                 }

//             }

//         } else{

//             for( let i = 0; i < entities.length; i++ ){

//                 /**
//                  *  当前可视范围内没有符合条件的瓦片加载，删除掉所欲瓦片
//                  * 不能使用removeAll,我们只需要管理我们自己加载的部分即可
//                 */
//                 if(viewer.value.entities.contains(entities[i])){

//                     viewer.value.entities.remove(entities[i])

//                 }

//             }

//         }
//     }
// })






 

  
  // viewer.value.imageryLayers.addImageryProvider(
  //   new Cesium.ArcGisMapServerImageryProvider({
  //     url : 'https://localhost:6443/arcgis/services/huzhen/MapServer/WmsServer?'
  //   })
  // )
});
// await show_all(viewer);
</script>

<template>
  <div id="viewer" ref="cesiumContainer"></div>
</template>

<style scoped>
#viewer {
  width: 50%;
  height: 600px;
  margin-left: auto;
  margin-right: auto;
}
</style>
