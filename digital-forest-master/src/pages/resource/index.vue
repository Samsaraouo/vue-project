<script setup>

import Menu from "@/components/statistics/menu.vue";
import Table from "@/components/statistics/table.vue";
import {ref} from "vue";
import Map from "@/components/map/Map.vue";

const data = ref({
  titleName: "数据分类体系",
  items: [
    {
      id: "森林资源管理",
      children: [
        "林地信息表",
        "培育信息表",
        "森林统计分析表",
        "林业合同管理",
        "林业种质资源管理",
        "林木登记表",
        "森林测绘与调查表",
        "国有林场管理",
        "森林培育与保护管理",
      ]
    },
    {
      id: "荒漠化治理模块",
      children: [
        "荒漠化治理表"
      ]
    },
    {
      id: "自然保护区管理",
      children: [
        "自然保护区管理表"
      ]
    },
    {
      id: "林业合同管理",
      children: [
        "林业合同管理表"
      ]
    },
    {
      id: "卫星遥感数据管理系统",
      children: [
        "卫星影像采集管理",
        "卫星影像处理管理",
        "卫星影像分析管理",
        "卫星影像应用管理",
      ]
    },
  ]
})

const isMap = ref(false)
const tableData = ref({
  tableHead: [
    {
      value: "dataId",
      label: "数据编号"
    },
    {
      value: "dataArea",
      label: "数据地区"
    },
    {
      value: "primaryClas",
      label: "一级分类"
    },
    {
      value: "secondaryClas",
      label: "二级分类"
    },
    {
      value: "dataTime",
      label: "数据时间"
    },
    {
      value: "dataName",
      label: "数据名"
    },
    {
      value: "timeResolution",
      label: "时间分辨率"
    },
    {
      value: "spatialResolution",
      label: "空间分辨率"
    },
    {
      value: "dataUrl",
      label: "数据查看地址"
    },
    {
      value: "fileUrl",
      label: "数据文件地址"
    },
    {
      value: "remarks",
      label: "备注"
    },
  ],
  tableData: [
    {
      "dataId": 1479,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "1980",
      "dataName": "vegc1980.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": null,
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1480,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "1981",
      "dataName": "vegc1981.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": null,
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1481,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "1982",
      "dataName": "vegc1982.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": null,
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1482,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "1983",
      "dataName": "vegc1983.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": null,
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1483,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "1984",
      "dataName": "vegc1984.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": null,
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1484,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "1985",
      "dataName": "vegc1985.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": null,
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1485,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "1986",
      "dataName": "vegc1986.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": null,
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1486,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "1987",
      "dataName": "vegc1987.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": null,
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1487,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "1988",
      "dataName": "vegc1988.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": null,
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1488,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "1989",
      "dataName": "vegc1989.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": null,
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1489,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "1990",
      "dataName": "vegc1990.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc1990/ImageServer",
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1490,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "1991",
      "dataName": "vegc1991.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc1991/ImageServer",
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1491,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "1992",
      "dataName": "vegc1992.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": null,
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1492,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "1993",
      "dataName": "vegc1993.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": null,
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1493,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "1994",
      "dataName": "vegc1994.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": null,
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1494,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "1998",
      "dataName": "vegc1998.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": null,
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1495,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "1996",
      "dataName": "vegc1996.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": null,
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1496,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "1997",
      "dataName": "vegc1997.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": null,
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1497,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "1998",
      "dataName": "vegc1998.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": null,
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1498,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "1999",
      "dataName": "vegc1999.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": null,
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1499,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2000",
      "dataName": "vegc2000.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2000/ImageServer",
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1500,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2001",
      "dataName": "vegc2001.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2001/ImageServer",
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1501,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2002",
      "dataName": "vegc2002.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2002/ImageServer",
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1502,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2003",
      "dataName": "vegc2003.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2003/ImageServer",
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1503,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2004",
      "dataName": "vegc2004.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2004/ImageServer",
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1504,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2005",
      "dataName": "vegc2005.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2005/ImageServer",
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1505,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2006",
      "dataName": "vegc2006.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2006/ImageServer",
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1506,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2007",
      "dataName": "vegc2007.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2007/ImageServer",
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1507,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2008",
      "dataName": "vegc2008.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2008/ImageServer",
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1632,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2009",
      "dataName": "vegc2009.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2009/ImageServer",
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1637,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2010",
      "dataName": "vegc2010.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2010/ImageServer",
      "fileUrl": "",
      "remarks": "植被碳库"
    },
    {
      "dataId": 1638,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2011",
      "dataName": "vegc2011.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2011/ImageServer",
      "fileUrl": "",
      "remarks": "植被碳库"
    },
    {
      "dataId": 1639,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2012",
      "dataName": "vegc2012.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2012/ImageServer",
      "fileUrl": "",
      "remarks": "植被碳库"
    },
    {
      "dataId": 1645,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2013",
      "dataName": "vegc2013.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2013/ImageServer",
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1646,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2014",
      "dataName": "vegc2014.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2014/ImageServer",
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1647,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2015",
      "dataName": "vegc2015.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2015/ImageServer",
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1648,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2016",
      "dataName": "vegc2016.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2016/ImageServer",
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1649,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2017",
      "dataName": "vegc2017.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2017/ImageServer",
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1650,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2018",
      "dataName": "vegc2018.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2018/ImageServer",
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1651,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2019",
      "dataName": "vegc2019.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2019/ImageServer",
      "fileUrl": null,
      "remarks": "植被碳库"
    },
    {
      "dataId": 1652,
      "dataArea": "northeast",
      "primaryClas": "gridpool",
      "secondaryClas": "vegc",
      "dataTime": "2020",
      "dataName": "vegc2020.tif",
      "timeResolution": "year",
      "spatialResolution": "4000m",
      "dataUrl": "http://121.43.40.232:6080/arcgis/rest/services/northeast/vegc2020/ImageServer",
      "fileUrl": null,
      "remarks": "植被碳库"
    }
  ],
  showMap: (val) => {
    isMap.value = true;
    dataMap.value = {
      urls: val
    }
  }
})
const dataMap = ref({})
</script>

<template>
  <div style="height: 91.5vh;overflow-y: auto;position: relative">
    <el-row>
      <el-col :sm="5">
        <el-row class="css-row">
          <Menu v-bind="data"></Menu>
        </el-row>
      </el-col>
      <el-col :sm="19">
        <el-row class="css-row">
          <Table v-show="!isMap" v-bind="tableData"></Table>
          <Map v-if="isMap" v-bind="dataMap"></Map>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.css-row {
  min-height: calc(91vmin - 2vmax);
  width: 100%;
}
</style>