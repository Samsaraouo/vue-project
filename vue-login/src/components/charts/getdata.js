import axios from 'axios'
export default async function get_statistics(){
let json = {}
let array = ''
await axios({
    method: 'GET',
    url: 'get_static/',
}).then(Response=>{   
    json = Response.data;
    let newStr = json.replaceAll(')(', ',');
    newStr = newStr.replace('(', '');
    array = newStr.split(",");
})
return array
}

