<template>
  <div class="swiper-container" id="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in props.list" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
export default {
  name: "BaseCarousel",
};
</script>
<script setup>
import Swiper from "swiper";
import { watch } from "@vue/runtime-core";
import {defineProps,nextTick} from "vue"

const props = defineProps(['list'])


watch(()=>props.list,()=>{
  nextTick(()=>{
    new Swiper(".swiper-container", {
      autoplay: true, //可选选项，自动滑动
      loop: true,
      autoHeight: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    })
  })
},{
  immediate:true
})

</script>


<style scoped>
.swiper-container {
  --swiper-theme-color: #ff6600;
}
</style>