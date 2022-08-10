import { reqGetSearchInfo } from "@/api"

const state = {
    searchList:{}
}

const actions = {
    async getSearchList({commit},searchParams){
        const result = await reqGetSearchInfo(searchParams)
        if(result.code == 200){
            commit('GETSEARCHLIST',result.data)
        }
    }
}

const mutations = {
    GETSEARCHLIST(state,searchList){
        state.searchList = searchList
    }
}

const getters = {
    attrsList(state){
        return state.searchList.attrsList
    },
    goodsList(state){
        return state.searchList.goodsList
    },
    trademarkList(state){
        return state.searchList.trademarkList
    }
}

export default {
    namespaced:true,
    state,
    actions,
    mutations,
    getters
}