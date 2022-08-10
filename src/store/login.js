import { reqGetUserInfo, reqLogin, reqLogout } from "@/api"
import { deleteToken, getToken, setToken } from "@/utils/nanoid_token"

const state ={
    token:getToken('token'),
    userInfo:{}
}
const actions ={
    async login({commit},{phone,password}){
       let result = await reqLogin(phone,password)
       if(result.code == 200){
        commit('LOGIN',result.data.token)
        setToken(result.data.token)
        return "ok"
       }else{
        return Promise.reject(new Error(result.message))
       }
    },
    async getUserInfo({commit}){
        let result = await reqGetUserInfo()
        if(result.code == 200){
            commit('GETUSERINFO',result.data)
            return "ok"
        }
        else{
           return Promise.reject(new Error(result.message))
        }
    },
    async logout({commit}){
        let result = await reqLogout()
        if(result.code == 200){
            commit('LOGOUT')
            return '退出成功'
        }else{
            return Promise.reject('退出失败')
        }
    }
}
const mutations ={
    LOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo = userInfo
    },
    LOGOUT(state){
        state.token = "",
        state.userInfo = {},
        deleteToken()
    }
}
const getters ={}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}