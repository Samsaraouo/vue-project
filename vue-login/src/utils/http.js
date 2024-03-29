import axios from 'axios'

axios.defaullts.headers['Content-Type'] = 'application/x-www-form-urlencoded'

const service = axios.create({
    baseURL:'http://127.0.0.1:8000/api',
    timeout:15000
})