import axios from "axios";
let array = ''
let res = ''
export async function get_data(){
    let json = ''
    await axios({
        method: 'GET',
        url: 'get_data/',
    }).then(Response=>{   
    json = Response.data;
    let newStr = json.replaceAll(')(', ',');
    newStr = newStr.replace('(', '');
    array = newStr.split(",");
    for (let i = 0; i < array.length; i++) {
        if (i % 5 !== 0) {
            array[i] = array[i].replace(/'/g, '').trim();
        }
    }
    console.log(array);
})

let tableHead = []
let tableData = []
tableHead = [
    {value: "id", label: "疫木编号"},
    {value: "linban", label: "林班号"},
    {value: "xiaoban", label: "小班号"},
    {value: "dilei_name", label: "地类"},
    {value:"cunname",label:"村名"}
];
let i=0;
for (i;i<=json.length;i=i+5){
    
const Data = 
    {   

        "id": array[i],
        "linban": array[i+1],
        "xiaoban": array[i+2],
        "dilei_name": array[i+3],
        "cunname":array[i+4],
    };
    tableData.push(Data);
}
return tableData
}
export function update_data(form){
    console.log(form);
    axios({
        method: 'POST',
        url: 'modify_yimu/',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: form,
    }).then(Response=>{
        console.log(Response);
        res = Response.data;
    })
    return res
}