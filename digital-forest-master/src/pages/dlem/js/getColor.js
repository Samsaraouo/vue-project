import {Color} from "cesium";

export function getColor(name) {
    if (!window.hasOwnProperty("colorHash")) window.colorHash = {}
    let colorHash = window.colorHash;
    let color = colorHash[name];
    if (!color) {
        color = Color.fromRandom({
            alpha: 1,
            minimumRed: 0.7,
            minimumBlue: 0.7,
            minimumGreen: 0.7,
            maximumRed: 0.9,
            maximumBlue: 0.9,
            maximumGreen: 0.9,
        });
        colorHash[name] = color;
    }
    return colorHash[name]
}

export function getColorAsRgb(name) {
    return getColor(name).toCssHexString()
}

export function getColorAlpha(name) {
    return getColor(name).withAlpha(0.01)
}

export function setEntityColorHidden(entity) {
    entity.polygon.material = getColorAlpha(entity.properties["type_two"]);
    entity.polyline.material = getColor(entity.properties["type_two"]);
    entity.polyline.width = 4;
}

export function setEntityColorShow(entity) {
    entity.polygon.material = getColor(entity.properties["type_two"]);
    entity.polyline.material = Color.fromCssColorString('#ffffff');
    entity.polyline.width = 1;
}
