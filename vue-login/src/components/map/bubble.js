import * as Cesium from "cesium";

export default class Bubble {
    constructor(val) {
        this.viewer = val.viewer
        // this.addDynamicLabel({id:1,position:val.position,title:"cl弹窗"});
    }

    addDynamicLabel(data, popup, div) {
        // div.id = data.id;
        // div.style.display="inline"
        // div.style.position = "absolute";
        // div.style.width = "300px";
        // div.style.height = "30px";
        this.viewer.cesiumWidget.container.appendChild(div);
        let gisPosition = popup.position
        const canvasHeight = this.viewer.scene.canvas.height;
        const elWidth = div.offsetWidth;
        const windowPosition = new Cesium.Cartesian2();
        Cesium.SceneTransforms.wgs84ToWindowCoordinates(
            this.viewer.scene,
            gisPosition,
            windowPosition
        );
        div.style.bottom = canvasHeight - windowPosition.y + "px";
        div.style.left = windowPosition.x + "px";
        this.viewer.scene.preRender.addEventListener(() => {
            Cesium.SceneTransforms.wgs84ToWindowCoordinates(
                this.viewer.scene,
                gisPosition,
                windowPosition
            );
            div.style.bottom = canvasHeight - windowPosition.y + "px";
            div.style.left = windowPosition.x + "px";
        }, this);
    }
}
