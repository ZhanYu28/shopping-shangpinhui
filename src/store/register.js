import { reqGetAuthCode,reqRegisterUser } from "@/api"

const state = {}
const actions = {
    async getAuthCode(context,phone){
        let result = await reqGetAuthCode(phone)
        if(result.code == 200){
            return result.data
        }else{
            return Promise.reject(new Error('注册失败'))
        }
    },
    async registerUser(context,{phone,password,code}){
        let result = await reqRegisterUser(phone,password,code)
        console.log(result);
        
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error(result.message))
        }
        
    }
}
const mutations = {}
const getters = {}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}