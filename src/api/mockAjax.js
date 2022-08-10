import axios from "axios";
import nprogress from "nprogress";
import 'nprogress/nprogress.css'

const requests = axios.create({
    baseURL:"/mock",
    timeout:3000
})
requests.interceptors.request.use((config)=>{
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