import * as Cesium from "cesium";
import EE from "../../utils/emitter";
import Popup from "../popup.vue";

export default function showPopup(viewer) {
  let colored_entity = ""; //查看是否已有换颜色的模型
  let colored_entity_id = "";
  let _this = this;

  const handler_1 = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler_1.setInputAction(function (movement) {
    const pick = viewer.scene.pick(movement.position);
    const pickedFeature = viewer.scene.pick(movement.position, 1.2, 1.2);
    var greenColor = Cesium.Color.fromCssColorString("green");
    var redColor = Cesium.Color.fromCssColorString("red");
    var point = new Cesium.Cartesian2(movement.position.x, movement.position.y);
    if (Cesium.defined(pick)) {
      if (pick.id.id !== colored_entity_id && colored_entity_id !== "") {
        //如果有，先将换颜色的模型换回来，在把当前模型换色
        colored_entity.point.color = redColor;
        pick.id.point.color = greenColor;
        colored_entity_id = pick.id.id;
        colored_entity = pick.id;
        colored_entity_id = colored_entity_id.toString();
        let properties = {};
        let name = pick.id.name;
        for (let key in pick.id.properties._propertyNames) {
          let title = pick.id.properties._propertyNames[key];
          let value = pick.id.properties[title]._value;
          properties[title] = value;
        }
        let popup = new Popup({
          name: name,
          viewer: _this.viewer,
          properties: properties,
          geometry: _this.viewer.scene.globe.pick(
            _this.viewer.camera.getPickRay(point),
            _this.viewer.scene
          ),
        });
      } else {
        //如果没有，直接把当前模型换色
        pick.id.point.color = greenColor;
        colored_entity_id = pick.id.id;
        colored_entity = pick.id;
        colored_entity_id = colored_entity_id.toString();
        let properties = {};
        let name = pick.id.name;
        for (let key in pick.id.properties._propertyNames) {
          let title = pick.id.properties._propertyNames[key];
          let value = pick.id.properties[title]._value;
          properties[title] = value;
        }
        let popup = new Popup({
          name: name,
          viewer: _this.viewer,
          properties: properties,
          geometry: _this.viewer.scene.globe.pick(
            _this.viewer.camera.getPickRay(point),
            _this.viewer.scene
          ),
        });
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

export function hidePopup(viewer) {
  EE.emit("setPopup", {
    visible: false,
  });
  viewer.screenSpaceEventHandler.removeInputAction(
    ScreenSpaceEventType.LEFT_CLICK
  );
}
