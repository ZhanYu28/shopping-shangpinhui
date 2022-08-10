const AppHome = ()=>import("@/pages/Home")
const AppSearch = ()=>import("@/pages/Search")
const AppLogin = ()=>import("@/pages/Login")
const AppRegister = ()=>import("@/pages/Register")
const AppDetail = ()=>import("@/pages/Detail")
const AddCartSuccess = ()=>import("@/pages/AddCartSuccess")
const ShopCart = ()=>import('@/pages/ShopCart')
const AppTrade = ()=>import('@/pages/Trade')
const TradepPay = ()=>import('@/pages/Pay')
const PaySuccess = ()=>import('@/pages/PaySuccess')
const PersonalCenter = ()=>import('@/pages/Center')
const MyOrder = ()=>import('@/pages/Center/MyOrder')
const GroupOrder = ()=>import('@/pages/Center/GroupOrder')

export default [
    {
        path:"/",
        redirect:{name:'home'}
    },
    {
        path:"/home",
        name: "home",
        component: AppHome,
        meta:{
            typeNavIsShow:true
        }
    },
    {
        path:"/trade",
        name: "trade",
        component: AppTrade,
        beforeEnter:(to,from)=>{
            if(from.path != "/shopcart"){
                return false
            }
        }
    },
    {
        path:"/pay",
        name: "pay",
        component: TradepPay,
        beforeEnter:(to,from)=>{
            if(from.path != "/trade"){
                return false
            }
        }
    },
    {
        path:"/paysuccess",
        name: "paysuccess",
        component: PaySuccess,
        beforeEnter:(to,from)=>{
            if(from.path != "/pay"){
                return false
            }
        }
    },
    {
        path:"/center",
        name: "center",
        redirect:{name:'myorder'},
        component: PersonalCenter,
        children:[
            {
                path:'myorder',
                name:'myorder',
                component:MyOrder
            },
            {
                path:'grouporder',
                name:'grouporder',
                component:GroupOrder
            }
        ]
    },
    {
        path:"/search/:keyword?",
        name: "search",
        component: AppSearch
    },
    {
        path:"/detail/:skuid",
        name:"detail",
        component:AppDetail
    },
    {
        path:"/addcartsuccess",
        name:"addcartsuccess",
        component:AddCartSuccess
    },
    {
        path:"/shopcart",
        name:"shopcart",
        component:ShopCart
    },
    {
        path:"/login",
        name: "login",
        component: AppLogin,
        meta:{
            hidenFooter:true
        }
    },
    {
        path:"/register",
        name: "register",
        component: AppRegister,
        meta:{
            hidenFooter:true
        }
    },
]