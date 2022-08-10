import { createApp } from 'vue'
// 引入全局注册组件
import App from './App.vue'
import TypeNav from '@/components/TypeNav'
import BaseCarousel from "@/components/Carousel";
import BasePagination from "@/components/pagination"
// 引入插件
import router from './router'
import store from './store'
// 引入封装好的模拟数据请求
import "@/mock/mockServe"
// 引入阿里图标样式
import "./assets/iconfont/iconfont.css"
// 引入swiper库样式
import "swiper/css/swiper.css";
// 引入elementui
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload';

import load from '@/assets/load.gif'
import error from '@/assets/error.gif'

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
app.use(VueLazyload,{
    error:error,
    loading:load
})
app.component(TypeNav.name,TypeNav)
app.component(BaseCarousel.name,BaseCarousel)
app.component(BasePagination.name,BasePagination)
app.mount('#app')



