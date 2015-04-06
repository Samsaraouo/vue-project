import {
    WebMapServiceImageryProvider,
} from "cesium";

export function loadImage(viewer, url) {
    console.log(url)
    return new WebMapServiceImageryProvider({
            url: "http://121.43.40.232:6080/arcgis/services/northeast/vegc2011/ImageServer/WMSServer",
            layers: '2011',
        }
    )
}