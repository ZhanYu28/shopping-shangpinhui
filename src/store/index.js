import { createStore } from "vuex";
import home from './home'
import search from './search'
import detail from "./detail";
import shopcart from "./shopcart";
import register from "./register";
import login from "./login";
import trade from "./trade";
import myOrder from "./myOrder";

export default createStore({
    modules:{
        home,
        search,
        detail,
        shopcart,
        register,
        login,
        trade,
        myOrder
    }
})