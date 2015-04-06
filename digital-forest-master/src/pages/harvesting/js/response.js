export function getOwnershipData(name){
    let tableHead = []
    let tableData = []
    switch (name) {
        case "木材采伐模块": {
            tableHead = [
                {value: "id", label: "采伐编号"},
                {value: "expenses", label: "采伐费用"},
                {value: "area", label: "采伐面积"},
                {value: "type", label: "树种"},
                {value: "amount", label: "伐木量"},
            ];
            tableData = [
                {
                    "id": "001",
                    "expenses": "28710元",
                    "area": "29亩",
                    "type": "阔叶林",
                    "amount": "957吨",
                },
                {
                    "id": "002",
                    "expenses": "28710元",
                    "area": "29亩",
                    "type": "阔叶林",
                    "amount": "957吨",
                },
                {
                    "id": "003",
                    "expenses": "28710元",
                    "area": "29亩",
                    "type": "阔叶林",
                    "amount": "957吨",
                },
                {
                    "id": "004",
                    "expenses": "28710元",
                    "area": "29亩",
                    "type": "阔叶林",
                    "amount": "957吨",
                },
                {
                    "id": "005",
                    "expenses": "28710元",
                    "area": "29亩",
                    "type": "阔叶林",
                    "amount": "957吨",
                },
                {
                    "id": "006",
                    "expenses": "28710元",
                    "area": "29亩",
                    "type": "阔叶林",
                    "amount": "957吨",
                },
                {
                    "id": "007",
                    "expenses": "28710元",
                    "area": "29亩",
                    "type": "阔叶林",
                    "amount": "957吨",
                },
                {
                    "id": "008",
                    "expenses": "28710元",
                    "area": "29亩",
                    "type": "阔叶林",
                    "amount": "957吨",
                },
                {
                    "id": "009",
                    "expenses": "28710元",
                    "area": "29亩",
                    "type": "阔叶林",
                    "amount": "957吨",
                },
                {
                    "id": "010",
                    "expenses": "28710元",
                    "area": "29亩",
                    "type": "阔叶林",
                    "amount": "957吨",
                },
            ]
            break;
        }
    }
    return {
        tableHead,tableData
    }
}