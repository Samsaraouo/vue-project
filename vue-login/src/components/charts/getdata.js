import axios from 'axios'
await axios({
    method: 'GET',
    url: 'get_data/',
}).then(Response=>{   
    let json = Response.data;
})