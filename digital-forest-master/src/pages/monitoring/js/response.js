export function getOwnershipData(name) {
    let tableHead = []
    let tableData = []
    switch (name) {
        case "基本指标": {
            tableHead = [
                {value: "id", label: "土地编号"},
                {value: "Temperature", label: "温度"},
                {value: "humidity", label: "湿度"},
                {value: "windDirection", label: "风向"},
                {value: "windSpeed", label: "风速"},
                {value: "precipitation", label: "降水量"},
                {value: "lightIntensity", label: "光照强度"},
                {value: "soilMoistureContent", label: "土壤含水量"},
                {value: "airQuality", label: "空气质量"},
                {value: "waterQuality", label: "水质状况"},
                {value: "altitude", label: "海拔高度"},
            ];
            tableData = [
                {
                "id":"001",
                "Temperature":"20℃",
                "humidity":"50%",
                "windDirection":"东南",
                "windSpeed":"0.15m/s",
                "precipitation":"1毫米",
                "lightIntensity":"5000lx",
                "soilMoistureContent":"32.46%",
                "airQuality":"优",
                "waterQuality":"V类",
                "altitude":"312米",
                },
                {
                "id":"002",
                "Temperature":"20℃",
                "humidity":"50%",
                "windDirection":"东南",
                "windSpeed":"0.15m/s",
                "precipitation":"1毫米",
                "lightIntensity":"5000lx",
                "soilMoistureContent":"32.46%",
                "airQuality":"优",
                "waterQuality":"V类",
                "altitude":"312米",
                },
                {
                "id":"003",
                "Temperature":"20℃",
                "humidity":"50%",
                "windDirection":"东南",
                "windSpeed":"0.15m/s",
                "precipitation":"1毫米",
                "lightIntensity":"5000lx",
                "soilMoistureContent":"32.46%",
                "airQuality":"优",
                "waterQuality":"V类",
                "altitude":"312米",
                },
                {
                "id":"004",
                "Temperature":"20℃",
                "humidity":"50%",
                "windDirection":"东南",
                "windSpeed":"0.15m/s",
                "precipitation":"1毫米",
                "lightIntensity":"5000lx",
                "soilMoistureContent":"32.46%",
                "airQuality":"优",
                "waterQuality":"V类",
                "altitude":"312米",
                },
                {
                "id":"005",
                "Temperature":"20℃",
                "humidity":"50%",
                "windDirection":"东南",
                "windSpeed":"0.15m/s",
                "precipitation":"1毫米",
                "lightIntensity":"5000lx",
                "soilMoistureContent":"32.46%",
                "airQuality":"优",
                "waterQuality":"V类",
                "altitude":"312米",
                },
                {
                "id":"006",
                "Temperature":"20℃",
                "humidity":"50%",
                "windDirection":"东南",
                "windSpeed":"0.15m/s",
                "precipitation":"1毫米",
                "lightIntensity":"5000lx",
                "soilMoistureContent":"32.46%",
                "airQuality":"优",
                "waterQuality":"V类",
                "altitude":"312米",
                },
                {
                "id":"007",
                "Temperature":"20℃",
                "humidity":"50%",
                "windDirection":"东南",
                "windSpeed":"0.15m/s",
                "precipitation":"1毫米",
                "lightIntensity":"5000lx",
                "soilMoistureContent":"32.46%",
                "airQuality":"优",
                "waterQuality":"V类",
                "altitude":"312米",
                },
                {
                "id":"008",
                "Temperature":"20℃",
                "humidity":"50%",
                "windDirection":"东南",
                "windSpeed":"0.15m/s",
                "precipitation":"1毫米",
                "lightIntensity":"5000lx",
                "soilMoistureContent":"32.46%",
                "airQuality":"优",
                "waterQuality":"V类",
                "altitude":"312米",
                },
                {
                "id":"009",
                "Temperature":"20℃",
                "humidity":"50%",
                "windDirection":"东南",
                "windSpeed":"0.15m/s",
                "precipitation":"1毫米",
                "lightIntensity":"5000lx",
                "soilMoistureContent":"32.46%",
                "airQuality":"优",
                "waterQuality":"V类",
                "altitude":"312米",
                },
                {
                "id":"010",
                "Temperature":"20℃",
                "humidity":"50%",
                "windDirection":"东南",
                "windSpeed":"0.15m/s",
                "precipitation":"1毫米",
                "lightIntensity":"5000lx",
                "soilMoistureContent":"32.46%",
                "airQuality":"优",
                "waterQuality":"V类",
                "altitude":"312米",
                },
            ]
            break
        }
    }
    return {
        tableHead, tableData
    }

}