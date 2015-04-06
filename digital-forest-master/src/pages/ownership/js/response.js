export function getOwnershipData(name) {
    let tableHead = []
    let tableData = []
    switch (name) {
        case "林权信息管理": {
            tableHead = [
                {value: "id", label: "林权编号"},
                {value: "localtion", label: "地理位置"},
                {value: "type", label: "树种"},
                {value: "area", label: "面积"},
                {value: "duration", label: "使用年限"},
                {value: "divisions", label: "行政区划"},
            ];
            tableData = [
                {
                    "id": "1",
                    "localtion": "浙江农林大学1号林场",
                    "type": "阔叶林",
                    "area": "29亩",
                    "duration": "20",
                    "divisions": "浙江省杭州市临安区",
                },
                {
                    "id": "2",
                    "localtion": "浙江农林大学2号林场",
                    "type": "阔叶林",
                    "area": "20亩",
                    "duration": "20",
                    "divisions": "浙江省杭州市临安区",
                },
                {
                    "id": "3",
                    "localtion": "浙江农林大学3号林场",
                    "type": "阔叶林",
                    "area": "24亩",
                    "duration": "20",
                    "divisions": "浙江省杭州市临安区",
                },
                {
                    "id": "4",
                    "localtion": "浙江农林大学4号林场",
                    "type": "阔叶林",
                    "area": "16亩",
                    "duration": "20",
                    "divisions": "浙江省杭州市临安区",
                },
                {
                    "id": "5",
                    "localtion": "浙江农林大学5号林场",
                    "type": "阔叶林",
                    "area": "31亩",
                    "duration": "20",
                    "divisions": "浙江省杭州市临安区",
                },
                {
                    "id": "6",
                    "localtion": "浙江农林大学6号林场",
                    "type": "阔叶林",
                    "area": "42亩",
                    "duration": "20",
                    "divisions": "浙江省杭州市临安区",
                },
                {
                    "id": "7",
                    "localtion": "浙江农林大学7号林场",
                    "type": "阔叶林",
                    "area": "26亩",
                    "duration": "20",
                    "divisions": "浙江省杭州市临安区",
                },
                {
                    "id": "8",
                    "localtion": "浙江农林大学8号林场",
                    "type": "阔叶林",
                    "area": "24亩",
                    "duration": "20",
                    "divisions": "浙江省杭州市临安区",
                },
                {
                    "id": "9",
                    "localtion": "浙江农林大学9号林场",
                    "type": "阔叶林",
                    "area": "23亩",
                    "duration": "20",
                    "divisions": "浙江省杭州市临安区",
                },
                {
                    "id": "10",
                    "localtion": "浙江农林大学10号林场",
                    "type": "阔叶林",
                    "area": "30亩",
                    "duration": "20",
                    "divisions": "浙江省杭州市临安区",
                },
            ]
            break;
        }
    }
    return {
        tableHead,tableData
    }
}