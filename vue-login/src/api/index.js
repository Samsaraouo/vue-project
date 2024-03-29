import http from "../utils/http.js"

export function login(param){
    return http.post('/login/',param);
}