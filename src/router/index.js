import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes"
import store from "@/store";


const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        // 始终滚动到顶部
        return { top: 0 }
    }
})

router.beforeEach(async (to)=>{
    let token = store.state.login.token
    let name = store.state.login.userInfo.name

    if(token){
        // token存在，已登录
        if(to.name == "login"){
            // 已登录状态不能跳转到登录界面
            return {name:'home'}
        }else{
            // 登录状态跳转非登录界面时判断是否有用户数据，如果没有则请求获取
            if(!name){
                try {
                    await store.dispatch('login/getUserInfo')
                } catch (error) {
                    store.dispatch('login/logout')
                }
            }
        }
    }else{
        const toPath = to.path
        if(toPath.indexOf('trade') !=-1 || toPath.indexOf('pay') != -1||toPath.indexOf('center') !=-1){
           
            return {name:'login',query:{redirect:to.path}}
        }
        
    }
})

export default router