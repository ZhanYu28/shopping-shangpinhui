import { reqAddOrUpdataShopCart, reqGetGoogsInfo } from "@/api"
import { getUserId } from "@/utils/nanoid_token"

const state = {
    goodsInfo:{},
    userId:getUserId()
}

const actions = {
    // 获取sku详情
    async getGoodsInfo({commit},skuId){
       const result = await reqGetGoogsInfo(skuId)
       if(result.code == 200){
        commit("GETGOODSINFO",result.data)
       }
    },
    // 添加或更新购物车
    async addOrUpdataShopCart(context,{skuId,skuNum}){
        let result = await reqAddOrUpdataShopCart(skuId,skuNum)
        if(result.code == 200){
            return "ok"
        }else{
            return Promise.reject(new Error('添加购物车请求失败'))
        }
    }
}

const mutations = {
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo = goodsInfo
    }
}

const getters = {
    categoryView:(state)=>state.goodsInfo.categoryView || {},
    skuInfo:(state) =>state.goodsInfo.skuInfo || {},
    spuSaleAttrList:(state)=>state.goodsInfo.spuSaleAttrList || [],
}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}