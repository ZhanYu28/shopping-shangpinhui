import requests from "./request";
import mockRequest from "./mockAjax"

// 请求分类导航栏列表数据
export const reqCategoryList = ()=>requests({
    method:'get',
    url:'/product/getBaseCategoryList'
})
/******************************axios请求******************************/
// 请求搜索列表数据
export const reqGetSearchInfo = (params={})=>requests.post('/list',params)


// 请求详情页信息
export const reqGetGoogsInfo = (skuId) => requests.get(`/item/${skuId}`)

// 请求添加或更新购物车
export const reqAddOrUpdataShopCart = (skuId,skuNum) => requests.post(`/cart/addToCart/${ skuId }/${ skuNum }`)

// 请求购物车列表
export const reqShopCartList = ()=>requests.get('/cart/cartList')

// 请求改变购物车商品选中状态
export const reqChangeChecked = (skuId,isChecked)=>requests.get(`/cart/checkCart/${skuId}/${isChecked}`)

// 删除购物车中选中的商品
export const reqDeleteShopCart = (skuId) =>requests.delete(`/cart/deleteCart/${skuId}`)

// 获取验证码
export const reqGetAuthCode = (phone) => requests.get(`/user/passport/sendCode/${phone}`)

// 注册
export const reqRegisterUser = (phone,password,code) => requests.post('/user/passport/register',{phone,password,code})

// 登录
export const reqLogin = (phone,password) => requests.post('/user/passport/login',{phone,password})

// 退出登录
export const reqLogout = ()=>requests.get('/user/passport/logout')

// 获取用户信息
export const reqGetUserInfo = () =>requests.get('/user/passport/auth/getUserInfo')

// 获取用户地址
export const reqGetUserAddressList = ()=>requests.get('/user/userAddress/auth/findUserAddressList')

// 获取交易页信息
export const reqOrderInfo = ()=> requests.get('/order/auth/trade')

// 提交订单
export const reqSubmitOrder = (tradeNo,params)=>requests.post(`/order/auth/submitOrder?tradeNo=${tradeNo}`,params)
// // params格式
// #region
// {
//     "consignee": "admin",
//     "consigneeTel": "15011111111",
//     "deliveryAddress": "北京市昌平区2",
//     "paymentWay": "ONLINE",
//     "orderComment": "xxx",
//     "orderDetailList": [
//         {
//             "id": null,
//             "orderId": null,
//             "skuId": 6,
//             "skuName": " Apple iPhone 11 (A2223) 128GB 红色 移动联通电信22",
//             "imgUrl": "http://182.92.128.115:8080//rBFUDF6V0JmAG9XGAAGL4LZv5fQ163.png",
//             "orderPrice": 4343,
//             "skuNum": 2,
//             "hasStock": null
//         },
//         {
//             "id": null,
//             "orderId": null,
//             "skuId": 4,
//             "skuName": "Apple iPhone 11 (A2223) 128GB 红色",
//             "imgUrl": "http://182.92.128.115:80800/rBFUDF6VzaeANzIOAAL1X4gVWEE035.png",
//             "orderPrice": 5999,
//             "skuNum": 1,
//             "hasStock": null
//         }
//     ]
// }
// #endregion

// 获取订单支付信息
export const reqOrderPayInfo = (orderId) =>requests.get(`/payment/weixin/createNative/${orderId}`)

// 获取订单支付状态
export const reqGetOrderState = (orderId) =>requests.get(`/payment/weixin/queryPayStatus/${orderId}`)

// 获取我的订单列表
export const reqGetMyorder = (page,limit) =>requests.get(`/order/auth/${page}/${limit}`)

/******************************axios请求******************************/


/******************************mock请求******************************/
// 请求首页banner轮播图数据
export const reqGetBannerInfo = ()=>mockRequest.get('/banners')

// 请求首页floor的数据
export const reqGetFloorInfo = ()=>mockRequest.get('/floors')

// 请求搜索列表数据
export const reqGetSearchList = (searchParams)=>mockRequest.post('/list',searchParams)
/******************************mock请求******************************/
