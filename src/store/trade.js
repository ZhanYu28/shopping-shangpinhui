import { reqGetUserAddressList, reqOrderInfo } from "@/api"

const state ={
    userAddressList:[],
    orderInfo:{}

}
const actions ={
    async getUserAddress({commit}){
        let result = await reqGetUserAddressList()
        if(result.code == 200){
            commit('GETUSERADDRESS',result.data)
            
        }
        
    },
    async getOrderInfo({commit}){
        let result = await reqOrderInfo()
        if(result.code == 200){
            commit('GETORDERINFO',result.data)
            
        }
        
    }
}
const mutations ={
    GETUSERADDRESS(state,userAddressList){
        state.userAddressList = userAddressList
        
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo = orderInfo
        
    },
    CHANGEDEFUALTADDRESS(state,index){
        state.userAddressList.forEach(item=>{
            item.isDefault = 0
        })
        state.userAddressList[index].isDefault = 1
    }
}
const getters ={}

export default{
   namespaced:true,
   state,
   actions,
   mutations,
   getters
}