import { reqCategoryList,reqGetBannerInfo,reqGetFloorInfo } from "@/api"

const state = {
    categoryList:{},
    bannerList:[],
    floorList:[]
}

const actions = {
    getCategoryList({commit}){
        reqCategoryList().then((response)=>{
            commit("CATEGORYLIST",response.data)
        })
    },
    getBannerList({commit}){
        reqGetBannerInfo().then((response)=>{
            commit("GETBANNERLIST",response.data)
        })
    },
    async getFloorList({commit}){
        
       const result =  await reqGetFloorInfo()
       
       if(result.code == 200){
        commit('GETFLOORLIST',result.data)
       }
    }
}

const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    GETBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList
    }
}

const getters = {
}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}