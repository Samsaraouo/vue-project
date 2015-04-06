import {Cartesian3, Color, Entity, ScreenSpaceEventType} from "cesium";
import * as Cesium from "cesium";

let lonLat1, lonLat2, lonLat3

export function setBoxSelection(viewer) {
    viewer.scene.screenSpaceCameraController.enableRotate = false;
    viewer.screenSpaceEventHandler.setInputAction((movement) => {
        lonLat1 = getLonLat(movement.position, viewer)
        let entity = drowBox()
        viewer.entities.removeById("temp");
        viewer.entities.add(entity)
        viewer.screenSpaceEventHandler.setInputAction((movement) => {
            lonLat2 = getLonLat(movement.endPosition, viewer)
            // entity.polygon.hierarchy = new CallbackProperty(() => {
            //     return calcHierarchy(lonLat1, lonLat2);
            // }, false);
            entity.polygon.hierarchy = calcHierarchy(lonLat1, lonLat2);
            console.log(entity.polygon)
            entity.polyline.positions = entity.polygon.hierarchy._value.positions
            viewer.screenSpaceEventHandler.setInputAction((movement) => {
                lonLat3 = getLonLat(movement.position, viewer)
                console.log(lonLat1.longitude + "," + lonLat1.latitude)
                console.log(lonLat3.longitude + "," + lonLat3.latitude)
                viewer.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.MOUSE_MOVE);
                viewer.entities.removeById("temp");
            }, ScreenSpaceEventType.LEFT_UP)
        }, ScreenSpaceEventType.MOUSE_MOVE)
    }, ScreenSpaceEventType.LEFT_DOWN)
}

export function destroyBoxSelection(viewer) {
    viewer.entities.removeById("temp");
    viewer.scene.screenSpaceCameraController.enableRotate = true;
    viewer.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_DOWN);
    viewer.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_UP);

}

function drowBox() {
    return new Entity({
        id: "temp",
        polygon: {
            material: Color.fromAlpha(Color.fromCssColorString("rgba(130,185,211,0.41)"), 0.3),
            clampToGround: true,
            outline: false,
            zIndex: 2
        },
        polyline: {
            material: Color.fromAlpha(Color.fromCssColorString("rgb(2,42,84)"), 1),
            width: 3,
            clampToGround: true,
            zIndex: 2
        }
    });
}

function calcHierarchy(lonLat1, lonLat2) {
    return Cartesian3.fromDegreesArray([
            lonLat1.longitude,
            lonLat1.latitude,
            lonLat1.longitude,
            lonLat2.latitude,
            lonLat2.longitude,
            lonLat2.latitude,
            lonLat2.longitude,
            lonLat1.latitude,
            lonLat1.longitude,
            lonLat1.latitude,
        ]
    );
}

function getLonLat(position, viewer) {
    const ellipsoid = viewer.scene.globe.ellipsoid;
    const cartesian = viewer.scene.pickPosition(position)
    const cartographic = ellipsoid.cartesianToCartographic(cartesian);
    return {
        longitude: Cesium.Math.toDegrees(cartographic.longitude),
        latitude: Cesium.Math.toDegrees(cartographic.latitude),
    }
}
