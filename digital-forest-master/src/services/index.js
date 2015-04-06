import axios from 'axios'

const service = axios.create({
    baseURL: window.config.baseURL,
    timeout: 5000
})
service.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 403) {
            console.error(error.toString())
        }
        // console.error("接口信息报错" + error);
        return error;
    }
);
export default service