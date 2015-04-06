import * as Cesium from "cesium";
import {getColor, getColorAlpha} from "@/pages/dlem/js/getColor.js";

export async function loadGeojson(viewer, options) {
    const dataSource = new Cesium.GeoJsonDataSource();
    await dataSource.process(options.url, {
        clampToGround: true
    })
    dataSource.name = options.name
    const entities = dataSource.entities.values;
    for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        entity.polygon.outline = false;
        if (options?.isElevating) {
            entity.polygon.material = Cesium.Color.WHITE.withAlpha(0.3);
            // entity.polygon.extrudedHeight = 5;
        } else {
            const name = entity.properties["type_two"];
            entity.name = entity.id
            entity.polygon.material = getColor(name);
            entity.polygon.zIndex = 1;
            entity.polyline = {
                positions: entity.polygon.hierarchy._value.positions,
                width: 1,
                material: Cesium.Color.fromCssColorString('#ffffff'),
                clampToGround: true,
                zIndex:1
            }
        }
        // ({RELATIVE_TO_GROUND: entity.polygon.heightReference} = Cesium.HeightReference);   // 贴地
    }
    await viewer.dataSources.add(dataSource)


}
export function setColorHidden(viewer,name){
    viewer.dataSources.getByName(name)[0].show = false
}
export function setColorShow(viewer,name){
    console.log(viewer.dataSources.getByName(name))
    viewer.dataSources.getByName(name)[0].show = true
}
export async function loadGeojsonLine(viewer, options) {
    const dataSource = new Cesium.GeoJsonDataSource();
    await dataSource.process(options.url, {
        clampToGround: true
    })
    dataSource.name = options.name
    const entities = dataSource.entities.values;
    for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        entity.polygon.outline = false;
        if (options?.isElevating) {
            entity.polygon.material = Cesium.Color.WHITE.withAlpha(0.3);
            // entity.polygon.extrudedHeight = 5;
        } else {
            const name = entity.properties["type_two"];
            entity.name = entity.id
            entity.polygon.material = getColorAlpha(name);
            entity.polygon.zIndex = 1;
            entity.polyline = {
                positions: entity.polygon.hierarchy._value.positions,
                width: 1,
                material: getColor(name),
                clampToGround: true,
                zIndex:1
            }
        }
        // ({RELATIVE_TO_GROUND: entity.polygon.heightReference} = Cesium.HeightReference);   // 贴地
    }
    await viewer.dataSources.add(dataSource)


}