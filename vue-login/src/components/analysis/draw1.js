// drawShapes.js
import * as Cesium from "cesium";
import axios from "axios";
import * as echarts from "echarts";
export function drawRectangle(viewer, handler, positions, entity) {
  const result = clearDraw(handler, entity, viewer, positions);
  handler = result.handler;
  entity = result.entity;
  let rectangle1 = [];
  if (!positions) {
    positions = [];
  }
  handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  handler.setInputAction((event) => {
    let ray = viewer.camera.getPickRay(event.position);
    let earthPosition = viewer.scene.globe.pick(ray, viewer.scene);
    if (Cesium.defined(earthPosition)) {
      positions.push(earthPosition);
      if (positions.length === 1) {
        entity = viewer.entities.add({
          rectangle: {
            coordinates: Cesium.Rectangle.fromCartesianArray(positions),
            material: Cesium.Color.RED.withAlpha(0.5),
          },
        });
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  handler.setInputAction((movement) => {
    if (positions.length === 1) {
      let ray = viewer.camera.getPickRay(movement.endPosition);
      let earthPosition = viewer.scene.globe.pick(ray, viewer.scene);
      if (Cesium.defined(earthPosition)) {
        entity.rectangle.coordinates = Cesium.Rectangle.fromCartesianArray([
          positions[0],
          earthPosition,
        ]);
      }
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  handler.setInputAction((event = {}) => {
    if (positions.length > 0) {
      positions = [];
    }
    let rectangle = entity.rectangle.coordinates.getValue();
    
    let westSouth = Cesium.Cartographic.toCartesian(
      Cesium.Cartographic.fromRadians(rectangle.west, rectangle.south)
    );
    let eastSouth = Cesium.Cartographic.toCartesian(
      Cesium.Cartographic.fromRadians(rectangle.east, rectangle.south)
    );
    let westNorth = Cesium.Cartographic.toCartesian(
      Cesium.Cartographic.fromRadians(rectangle.west, rectangle.north)
    );
    let eastNorth = Cesium.Cartographic.toCartesian(
      Cesium.Cartographic.fromRadians(rectangle.east, rectangle.north)
    );
    rectangle1.push(westSouth);
    rectangle1.push(eastSouth);
    rectangle1.push(westNorth);
    rectangle1.push(eastNorth);
    positions = rectangle1;
    linbanChart(rectangle1);
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  return { handler, entity, positions, rectangle1 };
}

export function drawPolygon(viewer, handler, positions, entity) {
  const result = clearDraw(handler, entity, viewer, positions);
  handler = result.handler;
  entity = result.entity;
  if (!positions) {
    positions = [];
  }
  handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  handler.setInputAction((event) => {
    let ray = viewer.camera.getPickRay(event.position);
    let earthPosition = viewer.scene.globe.pick(ray, viewer.scene);
    if (Cesium.defined(earthPosition)) {
      positions.push(earthPosition);
      if (positions.length === 2) {
        entity = viewer.entities.add({
          polygon: {
            hierarchy: new Cesium.PolygonHierarchy(positions),
            material: Cesium.Color.RED.withAlpha(0.5),
          },
        });
      }
      linbanChart(positions);
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  handler.setInputAction((movement) => {
    if (positions.length >= 2) {
      let ray = viewer.camera.getPickRay(movement.endPosition);
      let earthPosition = viewer.scene.globe.pick(ray, viewer.scene);
      if (Cesium.defined(earthPosition)) {
        entity.polygon.hierarchy = new Cesium.PolygonHierarchy([
          ...positions,
          earthPosition,
        ]);
      }
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  handler.setInputAction((event) => {
    if (positions.length > 2) {
      positions = [];
    }
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  return { handler, entity, positions };
}

export function drawCircle(viewer, handler, positions, entity) {
  const result = clearDraw(handler, entity, viewer, positions);
  handler = result.handler;
  entity = result.entity;
  if (!positions) {
    positions = [];
  }
  handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
  handler.setInputAction((event) => {
    let ray = viewer.camera.getPickRay(event.position);
    let earthPosition = viewer.scene.globe.pick(ray, viewer.scene);
    if (Cesium.defined(earthPosition)) {
      positions.push(earthPosition);
      if (positions.length === 2) {
        let radius = Cesium.Cartesian3.distance(positions[0], positions[1]);
        entity = viewer.entities.add({
          position: positions[0],
          ellipse: {
            semiMinorAxis: radius,
            semiMajorAxis: radius,
            material: Cesium.Color.RED.withAlpha(0.5),
          },
        });
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

  handler.setInputAction((movement) => {
    if (positions.length >= 2) {
      let ray = viewer.camera.getPickRay(movement.endPosition);
      let earthPosition = viewer.scene.globe.pick(ray, viewer.scene);
      if (Cesium.defined(earthPosition)) {
        let radius = Cesium.Cartesian3.distance(positions[0], earthPosition);
        entity.ellipse.semiMinorAxis = radius;
        entity.ellipse.semiMajorAxis = radius;
      }
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  handler.setInputAction((event) => {
    if (positions.length > 2) {
      positions = [];
      handler.destroy();
    }
    
  }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
  return { handler, entity, positions };
}
async function linbanChart(positions) {
  // 在这里添加你的代码
  let points = positions.map((position) => {
    const cartographic = Cesium.Cartographic.fromCartesian(position);
    const longitude = Cesium.Math.toDegrees(cartographic.longitude);
    const latitude = Cesium.Math.toDegrees(cartographic.latitude);
    return [longitude, latitude];
  });
  points = Array.from(points);
  // 确保多边形闭合
  if (
    points[0][0] !== points[points.length - 1][0] ||
    points[0][1] !== points[points.length - 1][1]
  ) {
    points.push(points[0]);
  }

  // 转换点数组为字符串
  const pointsStr = points
    .map((point) => {
      if (!Array.isArray(point) || point.length !== 2) {
        throw new Error(
          "Invalid point format. Each point should be an array with two numbers."
        );
      }
      return point.join(" ");
    })
    .join(", ");

  // 生成SQL语句
  let json = {};
  const sql = `SELECT id,lin_ban,xiao_ban,di_lei,hai_ba,cunname,xj,sg FROM app_yimu where st_Contains(st_transform(ST_GeomFromText('POLYGON((${pointsStr}))',4326),4549),geom);`;
  await axios({
    method: "POST",
    url: "create_polygon/",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: { sql: sql },
  }).then((Response) => {
    json = Response.data;
  });
  // 初始化图表
  let chart = echarts.init(document.getElementById("chart"));
  let pieData = [];
  console.log(json);
  let firstForestClass = json[0][1];
  let allSameForestClass = json.every((item) => item[1] === firstForestClass);

  if (allSameForestClass) {
    pieData.push({ value: 100, name: firstForestClass });
  } else {
    json.forEach((item) => {
      let forestClass = item[1];
      let forestClassData = pieData.find((data) => data.name === forestClass);

      if (forestClassData) {
        forestClassData.value += 1;
      } else {
        pieData.push({ value: 1, name: forestClass });
      }
    });
  }

  // 设置图表选项
  chart.setOption({
    title: {
      text: "林班分布统计",
      left: "center",
      top: 20,
      textStyle: {
        color: '#FFFFFF',
        fontStyle: 'italic',
        fontWeight: 'bold',
        fontSize: 28
    }
    },
    series: [
      {
        type: "pie",
        data: pieData,
        radius: ["30%", "50%"],
        label: {
          show: true,
          formatter: "{b}: {d}%",
          textStyle: {
            color: '#FFFFFF',
            fontStyle: 'italic',
            fontWeight: 'bold',
            fontSize: 14
          },
        },
      },
    ],
  });
  return json;
}

export function clearDraw(handler, entity, viewer, positions) {
  if (handler) {
    handler.destroy();
    handler = null;
  }
  if (entity) {
    viewer.entities.remove(entity);
    entity = null;
  }
  if (positions) {
    positions.length = 0;
  }
  return { handler, entity };
}
