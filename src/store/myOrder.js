import { reqGetMyorder } from "@/api"

const state={
    order:{}
}
const actions={
    async getMyOrder({commit},{page,limit}){
        let result = await reqGetMyorder(page,limit)
        if(result.code == 200){
            commit('GETMYORDER',result.data)
        }
    }
}
const mutations={
    GETMYORDER(state,order){
        state.order = order
    }
}
const getters={}

export default{
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}