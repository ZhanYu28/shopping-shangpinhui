<template>
  <AppHeader />
  <router-view></router-view>
  <AppFooter v-show="!router.meta.hidenFooter"/>
</template>

<script>
// 引入组件
import AppHeader from "./components/Header"
import AppFooter from "./components/Footer"
// 引入工厂函数
import { useRoute } from 'vue-router'
import { onMounted } from '@vue/runtime-core'
// 引入封装好的mapaction
import {useStoreActions} from '@/store/storeMap'



export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  setup(){
    const router = useRoute()

    const {getCategoryList} = useStoreActions("home",['getCategoryList','getBannerList'])
    
    onMounted(()=>{
      getCategoryList()
    })
    return{
      router
    }
  }
}
</script>

<style>

</style>
