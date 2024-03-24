<template>
  <div>
    <div id="map" style="height: 500px"></div>
  </div>
  
  </template>
  
  <script>
  import "ol/ol.css";
  import { Map, View } from "ol";
  import TileLayer from "ol/layer/Tile";
  import Layer from "ol/layer/Layer";
  import XYZ from 'ol/source/XYZ';
  import TileWMS from 'ol/source/TileWMS';
  import { notification } from 'ant-design-vue';
  import mapboxgl from 'mapbox-gl';
  import Source from "ol/source/Source";
  import { toLonLat } from "ol/proj";
  export default {
    data(){
            return{
                tileWMSSource:'',
                tileLayer:'',
                map:'',
        dataSource: [
         
        ],
            }
        },
    methods:{
      openNotification() {
      notification.open({
        message: '站点信息',
        description: '站点号:'+this.dataSource[0].station_code+'\t位置:'+this.dataSource[0].longlatitude+'\n\n水深:'+this.dataSource[0].water_depth+'\n锰:'+this.dataSource[0].mn+'\n铁:'+this.dataSource[0].fe+'\n钴:'+this.dataSource[0].co+'\n镍:'+this.dataSource[0].ni
        +'\n铜:'+this.dataSource[0].cu+'\n锌:'+this.dataSource[0].zn+'\n铅:'+this.dataSource[0].pb+'\n硅:'+this.dataSource[0].si
        ,
        placement:'bottomRight',
      });
    },
         pointClick(evt) {
        var view=this.map.getView();
        var source = this.tileLayer.getSource()
        var viewResolution = view.getResolution();
        var url = source.getFeatureInfoUrl(
          evt.coordinate, viewResolution, view.getProjection(),
          {'INFO_FORMAT': 'application/json', 'FEATURE_COUNT': 1});
        if (url) {
          console.log(url)
          this.axios({
            url:url,
            method:'GET'
          }).then(res=>{
            let data=res.data.features[0].properties;
            console.log(data.mn);
            this.dataSource=[];
            this.dataSource.push(data);
            this.openNotification();
          })
        }
      }
    },
    mounted() {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZHNkc2E1NiIsImEiOiJjbDkwbHB0M2MwdDY5M3VvNmFhZ2VyNXYzIn0.Yby6f577gdidAGB81sCmDw';
      var mbMap = new mapboxgl.Map({
          container: 'map', // container ID
          style: 'mapbox://styles/dsdsa56/cl90pdfhk000w14nvlb5kccne', // style URL
          center: [-74.5, 40], // starting position [lng, lat]
          zoom: 9, // starting zoom
          
      });
      var mbLayer = new Layer({
    render: function (frameState) {
        var canvas = mbMap.getCanvas();
        var viewState = frameState.viewState;

        var visible = mbLayer.getVisible();
        canvas.style.display = visible ? 'block' : 'none';

        var opacity = mbLayer.getOpacity();
        canvas.style.opacity = opacity;

        // adjust view parameters in mapbox
        var rotation = viewState.rotation;
        mbMap.jumpTo({
            center: toLonLat(viewState.center),
            zoom: viewState.zoom - 1,
            bearing: (-rotation * 180) / Math.PI,
            animate: false,
        });

        // cancel the scheduled update & trigger synchronous redraw
        // see https://github.com/mapbox/mapbox-gl-js/issues/7893#issue-408992184
        // NOTE: THIS MIGHT BREAK IF UPDATING THE MAPBOX VERSION
        if (mbMap._frame) {
            mbMap._frame.cancel();
            mbMap._frame = null;
        }
        mbMap._render();
        return canvas;
    },
    source: new Source({
        attributions: [
             ],
    }),
});
      this.tileWMSSource=new TileWMS({
                        url:"http://124.223.178.73:8080/geoserver/seamental/wms",
                        //crossOrigin:"anonymous",
                        wrapX:true,
                    params: {
                        'FORMAT': 'image/png',
                        'VERSION': '1.1.1',
                        tiled: true,
                        STYLES: '',
                        LAYERS: 'seamental:OMMAPP_mentalinformation'
                        }
                    });
       this.tileLayer=new TileLayer({
                    title:"geoserver地图",
                    name:"geoserver地图测试-矢量图层",
                    source:this.tileWMSSource
                });
      this.map = new Map({
        target: "map",
        layers: [this.tileLayer,
        // new TileLayer({
        //       title:"天地图矢量图层",
        //       name:"天地图矢量图层",
        //       source:new XYZ({
        //         projection: "EPSG:4326",
        //           url:"https://t4.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&LAYER=vec&TILEMATRIXSET=c&FORMAT=tiles&VERSION=1.0.0&STYLE=default&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=30263d05105ddc0b57afd30dbad5ec62",
        //           //crossOrigin:"anonymous",
        //           wrapX:false
        //       })
        //   }),
          mbLayer,
  // new TileLayer({
  //     title:"天地图注记图层",
  //     name:"天地图矢量注记图层",
  //     source:new XYZ({
  //       projection: "EPSG:4326",
  //         url:"https://t0.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&LAYER=cva&TILEMATRIXSET=c&FORMAT=tiles&VERSION=1.0.0&STYLE=default&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=30263d05105ddc0b57afd30dbad5ec62",
  //         //crossOrigin:"anonymous",
  //         wrapX:false
  //     })
  // }),
  
        ],
        view: new View({
            center: [0, 0],
            zoom: 2,
            
        })
      });
      
      this.map.on('singleclick', this.pointClick);
    }

  };
  
  </script>
  
  <style scoped>
  #mapDiv{
    width: 100%;
    height: 400px;
  }
  #list{
    background-color: white;
    padding: 5px 5px;
  }
  
  </style>