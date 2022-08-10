import { computed } from "vue";
import {  useStore } from "vuex";

// 把mapState封装成useStateMapper
function useStateMapper(mapperfn, mapper) {
    const store = useStore()
    // 获取所有mapstate函数
    const storeStateFns = mapperfn(mapper)

    // 定义一个变量存放所有经过computed封装后的获取state的方法
    const storeState = {}

    Object.keys(storeStateFns).forEach(fnKey => {
        const fn = storeStateFns[fnKey].bind({$store:store})
        storeState[fnKey] = computed(fn)
    })

    return storeState
    
}

function useGettersMapper(mapperfn, mapper) {
    const store = useStore()

    const storeGettersFns = mapperfn(mapper)

    
    const storeGetters = {}
    
    Object.keys(storeGettersFns).forEach(fnKey => {
        const fn = storeGettersFns[fnKey].bind({$store:store})
        storeGetters[fnKey] = computed(fn)
    })

    return storeGetters

}

function useActionsMapper(mapperfn, mapper) {
    const store = useStore()

    const storeActionsFns = mapperfn(mapper)

    const storeActions = {}

    Object.keys(storeActionsFns).forEach(fnKey =>{
        storeActions[fnKey] = storeActionsFns[fnKey].bind({$store:store})
    })
    return storeActions
}
function useMutationsMapper(mapperfn, mapper) {
    const store = useStore()

    const storeMutationsFns = mapperfn(mapper)

    const storeMutations = {}

    Object.keys(storeMutationsFns).forEach(fnKey =>{
        storeMutations[fnKey] = storeMutationsFns[fnKey].bind({$store:store})
    })
    return storeMutations
}

export {useStateMapper,useGettersMapper,useActionsMapper,useMutationsMapper}