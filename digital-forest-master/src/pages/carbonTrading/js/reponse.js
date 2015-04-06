export function getOwnershipData(name){
    let tableHead = []
    let tableData = []
    switch (name) {
        case "项目管理": {
            tableHead = [
                {value: "name", label: "项目名称"},
                {value: "leader", label: "负责人"},
                {value: "type", label: "项目类型"},
                {value: "status", label: "项目状态"},
                {value: "starttime", label: "开始时间"},
                {value: "endtime", label: "结束时间"},
            ];
            tableData = [
                {
                    "name": "浙江农林大学碳汇交易项目001",
                    "leader": "高育林",
                    "type": "碳汇交易项目",
                    "status": "29亩",
                    "starttime": "20231007",
                    "endtime": "20251007",
                },
                {
                    "name": "浙江农林大学碳汇交易项目002",
                    "leader": "高育林",
                    "type": "碳汇交易项目",
                    "status": "29亩",
                    "starttime": "20231007",
                    "endtime": "20251007",
                },
                {
                    "name": "浙江农林大学碳汇交易项目003",
                    "leader": "高育林",
                    "type": "碳汇交易项目",
                    "status": "29亩",
                    "starttime": "20231007",
                    "endtime": "20251007",
                },
                {
                    "name": "浙江农林大学碳汇交易项目004",
                    "leader": "高育林",
                    "type": "碳汇交易项目",
                    "status": "29亩",
                    "starttime": "20231007",
                    "endtime": "20251007",
                },
                {
                    "name": "浙江农林大学碳汇交易项目005",
                    "leader": "高育林",
                    "type": "碳汇交易项目",
                    "status": "29亩",
                    "starttime": "20231007",
                    "endtime": "20251007",
                },
                {
                    "name": "浙江农林大学碳汇交易项目006",
                    "leader": "高育林",
                    "type": "碳汇交易项目",
                    "status": "29亩",
                    "starttime": "20231007",
                    "endtime": "20251007",
                },
                {
                    "name": "浙江农林大学碳汇交易项目007",
                    "leader": "高育林",
                    "type": "碳汇交易项目",
                    "status": "29亩",
                    "starttime": "20231007",
                    "endtime": "20251007",
                },
                {
                    "name": "浙江农林大学碳汇交易项目008",
                    "leader": "高育林",
                    "type": "碳汇交易项目",
                    "status": "29亩",
                    "starttime": "20231007",
                    "endtime": "20251007",
                },
                {
                    "name": "浙江农林大学碳汇交易项目009",
                    "leader": "高育林",
                    "type": "碳汇交易项目",
                    "status": "29亩",
                    "starttime": "20231007",
                    "endtime": "20251007",
                },
                {
                    "name": "浙江农林大学碳汇交易项目010",
                    "leader": "高育林",
                    "type": "碳汇交易项目",
                    "status": "29亩",
                    "starttime": "20231007",
                    "endtime": "20251007",
                },
                {
                    "name": "浙江农林大学碳汇交易项目011",
                    "leader": "高育林",
                    "type": "碳汇交易项目",
                    "status": "29亩",
                    "starttime": "20231007",
                    "endtime": "20251007",
                },
            ]
            break;
        }
    }
    return {
        tableHead,tableData
    }
}
