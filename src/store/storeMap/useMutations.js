import { createNamespacedHelpers, mapMutations } from "vuex";
import { useMutationsMapper } from "./useMapper";

export default function useMutations(moduleName,mapper){
    let mapperfn = mapMutations

    if(mapper === undefined){
        mapper = moduleName
    }
    else{
        mapperfn = createNamespacedHelpers(moduleName).mapMutations
    }
    return useMutationsMapper(mapperfn,mapper)
    }