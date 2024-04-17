import * as Cesium from "cesium";
import axios from "axios";
import { ElMessage } from "element-plus";

let json = {};
//查找选中林区的疫木
export async function showpoint(viewer, data) {
  if (data == "") {
    ElMessage.error("查询失败，请选择林班");
  } else {
    await axios({
      method: "POST",
      url: "select_yimu/",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: { lb: data },
    }).then((Response) => {
      json = Response.data;
    });
    Cesium.GeoJsonDataSource.load(json).then(function (dataSource) {
      // dataSource.process(json,{
      // clampToGround: true
      // })
      viewer.dataSources.add(dataSource);
      var entities = dataSource.entities.values;
      for (var i = 0; i < entities.length; i++) {
        var entity = entities[i];
        entity.billboard = undefined;
        entity.point = new Cesium.PointGraphics({
          color: Cesium.Color.RED,
          pixelSize: 10,
          heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
        });
      }
      ElMessage.success("查询成功");
      viewer.zoomTo(entities[0]);
    });
  }
}
//查找选中林区的小班
export async function showxb(viewer, data) {
  if (data == "") {
    ElMessage.error("查询失败，请选择林班");
  } else {
    await axios({
      method: "POST",
      url: "select_xb/",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: { lb: data },
    }).then((Response) => {
      json = Response.data;
      console.log(json);
    });
    Cesium.GeoJsonDataSource.load(json).then(function (dataSource) {
      viewer.dataSources.add(dataSource);
      var entities = dataSource.entities.values;
      for (var i = 0; i < entities.length; i++) {
        const entity = entities[i];
        entity.polygon.outline = false;
        entity.name = entity.id;
        entity.polygon.zIndex = 1;
        entity.polygon.material = Cesium.Color.WHITE.withAlpha(0);
        entity.polyline = {
          positions: entity.polygon.hierarchy._value.positions,
          width: 1,
          material: Cesium.Color.fromCssColorString("#ffffff"),
          clampToGround: true,
          zIndex: 1,
        };
      }
      ElMessage.success("查询成功");
      viewer.zoomTo(entities[0]);
    });
  }
}

export async function remove(viewer) {
  await viewer.dataSources.removeAll();
}
export default {};
