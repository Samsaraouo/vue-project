import {setEntityColorHidden, setEntityColorShow} from "@/pages/dlem/js/getColor.js";
import {ScreenSpaceEventType} from "cesium";
import * as Cesium from "cesium";
import EE from "@/components/util/emitter.js";
import Bubble from "@/pages/dlem/class/Bubble.js";
let entityTemp
export function showPopup(viewer){
    let bubble = new Bubble({
        viewer,
    })
    let popup = {
        visible: false,
        position: {},
        properties: {}
    }
    viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
        const cartesian = viewer.scene.pickPosition(movement.position)
        const pickedFeature = viewer.scene.pick(movement.position, 1.2, 1.2);
        if (entityTemp) setEntityColorShow(entityTemp)
        if (typeof (pickedFeature) !== "undefined")   //鼠标是否点上
        {
            const ellipsoid = viewer.scene.globe.ellipsoid;
            const cartographic = ellipsoid.cartesianToCartographic(cartesian);
            const entity = pickedFeature.id;  //获取
            entityTemp = entity;
            setEntityColorHidden(entityTemp);
            popup.visible = true
            popup.position = Cesium.Cartesian3.fromDegrees(
                Cesium.Math.toDegrees(cartographic.longitude),
                Cesium.Math.toDegrees(cartographic.latitude),
                cartographic.height,
            );
            popup.properties = {
                "小班号": entity.properties['xiao_ban'],
                "林班名称": entity.properties['lb_name'],
                "优势树种": entity.properties["name"] === "null" ? "无" : entity.properties["name"],
                "二类树种": entity.properties["type_two"] === "null" ? "无" : entity.properties["type_two"],

                "面积": entity.properties['mian_ji'] + "hm²",
                // "坡度": entity.properties['po_du'],
                // "坡向": entity.properties['po_xiang'],
                "蓄积量": entity.properties['ji_xj'] + "m³",
                "碳储量": entity.properties['carbon_stocks'] + "tC",
                "树高": entity.properties['xc_gd'] + "m",
                "土地保护等级": entity.properties['bh_dj'] === "null" ? "无" : entity.properties['bh_dj'],
            }
            EE.emit("setPopup",popup)
            bubble.addDynamicLabel(entity, popup, document.getElementById("card"));
        } else {
            EE.emit("setPopup",{
                visible:false
            })
        }

    }, ScreenSpaceEventType.LEFT_CLICK);
}
export function hidePopup(viewer){
    EE.emit("setPopup",{
        visible:false
    })
    viewer.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_CLICK)
}
