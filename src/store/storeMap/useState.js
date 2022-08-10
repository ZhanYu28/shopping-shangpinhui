import { createNamespacedHelpers, mapState } from 'vuex'
import {useStateMapper} from './useMapper'


export default function useState(moduleName,mapper){
    let mapperfn = mapState

    // 如果第二个参数为空，则非模块化方式，将第一个参数赋值给mapper
    if(mapper === undefined){
        mapper = moduleName
    }
    // 第二个参数不为空，则使用了模块化，将mapstate函数改写为使用命名空间后的函数
    else{
        mapperfn = createNamespacedHelpers(moduleName).mapState
    }
    return useStateMapper(mapperfn,mapper)
}