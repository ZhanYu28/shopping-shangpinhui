import axios from "axios";
import nprogress from "nprogress";
import 'nprogress/nprogress.css'
import store from "@/store";

const requests = axios.create({
    baseURL:"/api",
    timeout:3000
})
requests.interceptors.request.use((config)=>{
    config.headers.userTempId = store.state.detail.userId
    if(store.state.login.token){
        config.headers.token = store.state.login.token
    }
    nprogress.start()
    return config
})
requests.interceptors.response.use((response)=>{
    console.log('响应拦截器获取成功++++',response);
    nprogress.done()
    return response.data
},
(error)=>{
    console.log('响应拦截器获取失败++++',error);
    nprogress.done()
    
    return error
})
export default requests