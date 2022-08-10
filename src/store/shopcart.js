import { reqShopCartList,reqChangeChecked, reqDeleteShopCart } from "@/api"

const state = {
    cartInfo:[]
}
const actions = {
    async getShopCartList({commit}){
        
        let result = await reqShopCartList()
        if(result.code == 200){
        commit('GETSHOPCARTLIST',result.data)
       }
    },
    async changeSkuChecked(context,{skuId,isChecked}){
        let result = await reqChangeChecked(skuId,isChecked)
        if(result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error('请求改变失败'))
        }
    },
     changeAllSkuChecked({dispatch,getters},isChecked){
        let promiseAll = []
        getters.cartInfoList.forEach( item => {
            let promise =  dispatch('changeSkuChecked',{skuId:item.skuId,isChecked})
            promiseAll.push(promise)
        });
        return Promise.all(promiseAll)
    },
    async deleteIsCheckedShop(context,skuId){
        let result = await reqDeleteShopCart(skuId)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('请求删除失败'))
        }
    },
     deleteAllIsCheckedshop({dispatch,getters}){
        let promiseAll = []
        getters.cartInfoList.forEach(item=>{
           let promise =  item.isChecked == 1?dispatch('deleteIsCheckedShop',item.skuId):""
           promiseAll.push(promise)
        })
        console.log(Promise.all(promiseAll));
        
        return Promise.all(promiseAll)
    }
}
const mutations = {
    GETSHOPCARTLIST(state,cartInfo){
        state.cartInfo = cartInfo[0] || []
    }
}
const getters = {
    cartInfoList(state){
        return state.cartInfo.cartInfoList || []
    }
}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}