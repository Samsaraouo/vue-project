<template>
    <div>
      <div id='map' style='width: 800px;height: 500px'></div>
    </div>
  </template>
   
  <script>
  import 'ol/ol.css'
  import {Map, View, Feature} from 'ol'
  import OSM from 'ol/source/OSM'
  import XYZ from 'ol/source/XYZ'
  import VectorSource from 'ol/source/Vector'
  import Cluster from 'ol/source/Cluster'
  import {Vector as VectorLayer, Tile as TileLayer} from 'ol/layer'
  import {Style, Fill as StyleFill, Stroke as StyleStroke, Circle as StyleCircle, Text as StyleText} from 'ol/style'
  import { Circle as GeomCircle, Point as GeomPoint, LineString as GeomLineString, Polygon as GeomPolygon } from 'ol/geom'
  import { Draw as InteractionDraw } from 'ol/interaction'
   
  export default {
    name: 'OpenLayersMap',
    data () {
      return {
        map: null,
        points: [],
        // 线条点数组
        linePoints: [],
        // 多边形数组
        polygonPoints: [],
      }
    },
    methods: {
      createMap () {
        let _this = this
   
        this.map = new Map({
          target: 'map',
          layers: [
          new TileLayer({
              title:"天地图矢量图层",
              name:"天地图矢量图层",
              source:new XYZ({
                projection: "EPSG:4326",
                  url:"https://t4.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&LAYER=vec&TILEMATRIXSET=c&FORMAT=tiles&VERSION=1.0.0&STYLE=default&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=bf0f37b22a7a08132dc9d5104a708f88",
                  //crossOrigin:"anonymous",
                  wrapX:false
              })
          }),
          ],
          view: new View({
            // 设置中心点，默认厦门，用于规划厦门市的未来发展
            center: [0, 0],
            // 设置缩放倍数
            zoom: 2,
          })
        })
        // 绑定点击事件
        this.map.on('click', function (e) {
          let coor = e.coordinate
          // console.log(e.coordinate)
          // console.log('lon:' + coor[0] + ',lat:' + coor[1])
          _this.handleClick(coor)
        })
        // 绘制聚合点
        _this.addMarker()
      },
      // 设置统一控制点击事件，需要画图方式在此处切换
      handleClick(point) {
        // 绘制连线
        // this.drawLineString(point)
        // 绘制点
        // this.drawPoint(point)
        // 绘制圆形
        // this.drawCircle(point)
        // 绘制多边形
        // this.drawPolygon(point)
      },
      // 绘制点位
      drawPoint (center) {
        let vectorLayer = this.getLayer()
   
        let point = new GeomPoint(center)
        let feature = new Feature(point)
        vectorLayer.getSource().addFeature(feature)
        this.map.addLayer(vectorLayer)
      },
      // 绘制连线
      drawLineString(point) {
        this.linePoints.push(point)
        let featureLine = new Feature({
          geometry: new GeomLineString(this.linePoints),
        });
        let source = new VectorSource()
        source.addFeature(featureLine)
        let layer = new VectorLayer()
        layer.setSource(source)
        this.map.addLayer(layer)
      },
      // 绘制区域圆形
      drawCircle (center) {
        let vectorLayer = this.getLayer()
   
        // 设置半径
        let circle = new GeomCircle(center, 0.003)// 新建圆对象
        let feature = new Feature(circle)// 新建Feature对象 并将circle传入
        vectorLayer.getSource().addFeature(feature)// 将Feature对象填入图层源
        this.map.addLayer(vectorLayer) // 将图层添至地图对象
      },
      //画多边形
      drawPolygon(point){
        this.polygonPoints.push(point)
        let feature = new Feature({
          geometry: new GeomPolygon([this.polygonPoints]),
          attributes: null
        });
        // 添加线的样式
        let lineStyle = new Style({
          fill: new StyleFill({
            color: 'rgba(1, 210, 241, 0.1)'
          }),
          stroke: new StyleStroke({
            color: 'rgba(255, 0, 0)',
            width: 4,
          }),
        });
        feature.setStyle(lineStyle);
        let source = new VectorSource();
        source.addFeature(feature)
        let vectorLayer = new VectorLayer({
          source: source
        })
        this.map.addLayer(vectorLayer)
      },
      // 设置聚合点
      addMarker() {
        let source = new VectorSource();
        // 随机创建200个要素，后台点位取出后按此格式处理
        for (let i = 1; i <= 200; i++) {
          let coordinates = [118.10 + Math.random() * 0.05, 24.48 + Math.random() * 0.05];
          let feature = new Feature(new GeomPoint(coordinates));
          source.addFeature(feature);
        }
   
        // 聚合
        let clusterSource = new Cluster({
          source: source,
          distance: 50
        })
   
        let clusters = new VectorLayer({
          source: clusterSource,
          style: function (feature, resolution) {
            let size = feature.get('features').length;
            let style = new Style({
              image: new StyleCircle({
                radius: 20,
                stroke: new StyleStroke({
                  color: 'white'
                }),
                fill: new StyleFill({
                  color: '#AAD3DF'
                })
              }),
              text: new StyleText({
                text: size.toString(),
                fill: new StyleFill({
                  color: 'black'
                })
              })
            })
            return style;
          }
        });
   
        this.map.addLayer(clusters)
      },
      // 获取新的 layer 图层对象
      getLayer () {
        return new VectorLayer({
          source: new VectorSource({
            features: ''
          }),
          // 设置样式，但不完全兼容
          // style: function (feature) {
          //   let style = new Style({
          //     stroke: new StyleStroke({
          //       color: '#E80000',
          //       width: 2
          //     }),
          //     fill: new StyleFill({
          //       color: 'rgba(0,0,0,0)'
          //     })
          //   })
          //   return style
          // }
        })
      }
    },
    mounted () {
      this.createMap()
    }
   
  }
  </script>
   
  <style>
   
  </style>