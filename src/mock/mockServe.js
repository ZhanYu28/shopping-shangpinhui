// 引入mock模块
import Mock from "mockjs";
// 引入模拟的数据
import banners from "./banners"
import floors from "./floors"
import searchList from "./searchList"

Mock.mock("/mock/banners",{code:200,data:banners})
Mock.mock("/mock/floors",{code:200,data:floors})
Mock.mock("/mock/list","post",(searchParams)=>{
    return {code:200,data:searchList,searchParams}
})


