import { message } from 'element-ui';
import axios from 'axios'
import qs, { stringify } from 'qs'

axios.defaullts.headers['Content-Type'] = 'application/x-www-form-urlencoded'

const service = axios.create({
    baseURL:'http://127.0.0.1:8000/api',
    timeout:15000
})

service.interceptors.request.use(config =>{
    if (config.method === "post"){
        config.data = qs/stringify(config.data, { indices: false})
    }
    return config;
},error => {
    Promise.reject(error)
})

service.interceptors.response.use(
    success => {
        if (success.data.code == 0){
            return success.data;
        }else if (success.data.code == 1){
            return success.data;
        }else{
            message({
                message: success.data.msg,
                type:'error',
                center: true
            })
        }
    }
)