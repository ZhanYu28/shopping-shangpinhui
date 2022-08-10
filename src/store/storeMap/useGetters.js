import { createNamespacedHelpers, mapGetters } from "vuex";
import { useGettersMapper } from "./useMapper";

export default function useGetters(moduleName, mapper) {
    let mapperfn = mapGetters

    if (mapper === undefined) {
        mapper = moduleName
    }
    else {
        mapperfn = createNamespacedHelpers(moduleName).mapGetters
        
    }
    return useGettersMapper(mapperfn, mapper)
}