import { mapActions,createNamespacedHelpers } from "vuex"
import { useActionsMapper } from "./useMapper"

export default function useActions(moduleName,mapper){
    let mapperfn = mapActions

    if(mapper === undefined){
        mapper = moduleName
    }
    else{
        mapperfn = createNamespacedHelpers(moduleName).mapActions
    }
    return useActionsMapper(mapperfn,mapper)
    }