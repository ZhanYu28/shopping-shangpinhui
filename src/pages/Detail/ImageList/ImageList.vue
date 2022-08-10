<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(sku, index) in props.skuImageList"
        :key="sku.id"
        @click="changeIndex(index)"
      >
        <img v-lazy="sku.imgUrl" :class="{active: data.currentIndex == index }"/>
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
export default {
  name: "DetailImageList",
};
</script>
<script setup>
import { nextTick, reactive, watch } from "@vue/runtime-core";
import Swiper from "swiper";
import $mittBus from '@/mitt';

const props = defineProps({
  skuImageList: {
    type: Array,
    default() {
      return [{}];
    },
  },
});

const data = reactive({
  currentIndex: 0,
});

// 图片点击事件
function changeIndex(index){
  data.currentIndex = index
  $mittBus.emit('changeShowImage',index)
}

// dom结构正确后使用轮播库
watch(props, () => {
  nextTick(() => {
    new Swiper(".swiper-container", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      slidesPerView: 3,
    });
  });
});
</script>


<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>