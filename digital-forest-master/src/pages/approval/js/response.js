export function getOwnershipData(name){
    let tableHead = []
    let tableData = []
    switch (name) {
        case "用地审批": {
            tableHead = [
                {value: "id", label: "地块编号"},
                {value: "location", label: "地块位置"},
                {value: "area", label: "土地面积"},
                {value: "type", label: "土地用途"},
            ];
            tableData = [
                {
                    "id": "001",
                    "location": "浙江农林大学001实验林场",
                    "area": "29亩",
                    "type": "林地",
                },
                {
                    "id": "002",
                    "location": "浙江农林大学002实验林场",
                    "area": "29亩",
                    "type": "林地",
                },
                {
                    "id": "003",
                    "location": "浙江农林大学003实验林场",
                    "area": "29亩",
                    "type": "林地",
                },
                {
                    "id": "004",
                    "location": "浙江农林大学004实验林场",
                    "area": "29亩",
                    "type": "林地",
                },
                {
                    "id": "005",
                    "location": "浙江农林大学005实验林场",
                    "area": "26亩",
                    "type": "林地",
                },
                {
                    "id": "006",
                    "location": "浙江农林大学006实验林场",
                    "area": "59亩",
                    "type": "林地",
                },
                {
                    "id": "007",
                    "location": "浙江农林大学007实验林场",
                    "area": "39亩",
                    "type": "林地",
                },
                {
                    "id": "008",
                    "location": "浙江农林大学008实验林场",
                    "area": "23亩",
                    "type": "林地",
                },
                {
                    "id": "009",
                    "location": "浙江农林大学009实验林场",
                    "area": "19亩",
                    "type": "林地",
                },
                {
                    "id": "010",
                    "location": "浙江农林大学010实验林场",
                    "area": "22亩",
                    "type": "林地",
                },
            ]
            break;
        }
    }
    return {
        tableHead,tableData
    }
}