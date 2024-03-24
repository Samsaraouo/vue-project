<template>
<div id="map"></div>
</template>

<script >
  import "ol/ol.css";
  import { Map, View } from "ol";
  import mapboxgl from 'mapbox-gl';
  import { Scene } from '@antv/l7';
import { Mapbox } from '@antv/l7-maps';
  export default {
    mounted(){
        mapboxgl.accessToken = 'pk.eyJ1IjoiY2hlbmdiZW5jaGFvIiwiYSI6ImNsODU3aGRiODA0Y2UzcHBzZmFlcmdqZ2sifQ.8k59W_pB_Riwe6o-MneRlA'
        Mapbox.accessToken='pk.eyJ1IjoiY2hlbmdiZW5jaGFvIiwiYSI6ImNsODU3aGRiODA0Y2UzcHBzZmFlcmdqZ2sifQ.8k59W_pB_Riwe6o-MneRlA'
        const scene = new Scene({
            id: 'map',
            map: new Mapbox({
                style: 'mapbox://styles/mapbox/satellite-streets-v11',
                zoom: 4,
                center: [-172.4279770787754, 28],
                pitch: 80,
                accessToken:'pk.eyJ1IjoiY2hlbmdiZW5jaGFvIiwiYSI6ImNsODU3aGRiODA0Y2UzcHBzZmFlcmdqZ2sifQ.8k59W_pB_Riwe6o-MneRlA'
            }),
            project:3857
        });
const map = scene.map;
// map.on("style.load", () => {
//     map.setFog({
//         range: [-1, 2],
//         'horizon-blend': 0.3,
//         'color': '#f8f0e3',
//         'high-color': '#add8e6',
//         'space-color': '#d8f2ff',
//         'star-intensity': 0.0
//     });
//     map.addSource('mapbox-dem', {
//         'type': 'raster-dem',
//         url: 'mapbox://mapbox.mapbox-terrain-dem-v1'
//     })
//     map.setTerrain({
//         source: 'mapbox-dem',
//         exaggeration: 1.5
//     })
// });
// map.addSource('hubei', {
//     'type': 'geojson',
//     'data': 'https://geo.datav.aliyun.com/areas_v3/bound/420000_full.json'
// });
// map.addLayer(
//     {
//         'id': 'hubei-fill',
//         'type': 'fill',
//         'source': 'hubei',
//         'layout': {},
//         'paint': {
//             'fill-color': '#f08',
//             'fill-opacity': 0.4
//         }
//     }
// );
map.on("style.load", () => {
map.addSource('wms-source', {
    'type': 'raster',
    'tiles': [
        'http://124.223.178.73:8080/geoserver/seamental/wms?service=WMS&version=1.1.0&request=GetMap&layers=seamental%3AOMMAPP_mentalinformation&bbox=-180.0%2C-90.0%2C180.0%2C90.0&width=768&height=384&srs=EPSG%3A4326&styles=&format=image%2Fpng'
        // 'http://124.223.178.73:8080/geoserver/seamental/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetFeatureInfo&FORMAT=image%2Fpng&TRANSPARENT=true&QUERY_LAYERS=seamental%3AOMMAPP_mentalinformation&STYLES&LAYERS=seamental%3AOMMAPP_mentalinformation&exceptions=application%2Fvnd.ogc.se_inimage&INFO_FORMAT=text%2Fhtml&FEATURE_COUNT=50&X=50&Y=50&SRS=EPSG%3A4326&WIDTH=101&HEIGHT=101&BBOX=-82.93359160423279%2C37.511717677116394%2C-47.42577910423279%2C73.0195301771164',
    ],
    'tileSize': 256,
    
});
map.addLayer({
        'id': 'wms-layer',
        'type': 'raster',
        'source': 'wms-source',
        'paint': {
            'raster-opacity': 0.3
        }
    },

);
});
    }
  }
</script>
<style >

</style>