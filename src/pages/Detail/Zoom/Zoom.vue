<template>
  <div class="spec-preview">
    <img v-lazy="props.skuImageList[imgIndex].imgUrl" />
    <div class="event" @mousemove="moveZoom"></div>
    <div class="big">
      <img
        v-lazy="props.skuImageList[imgIndex].imgUrl"
        :style="{ left: big.left + 'px', top: big.top + 'px' }"
      />
    </div>
    <div
      class="mask"
      :style="{ left: mask.left + 'px', top: mask.top + 'px' }"
      ref="maskEl"
    ></div>
  </div>
</template>

<script>
export default {
  name: "DetailZoom",
};
</script>
<script setup>
import { reactive, ref } from "@vue/runtime-core";
import throttle from "lodash/throttle";
import $mittBus from '@/mitt';

// 动态绑定的样式值
let mask = reactive({
  left: 0,
  top: 0,
});
let big = reactive({
  left: 0,
  top: 0,
});

// 获取class为mask的div实例
let maskEl = ref(null);

const props = defineProps({
  skuImageList: {
    type: Array,
    default() {
      return [{ s: "1" }];
    },
  },
});

// 鼠标移动事件
const moveZoom = throttle((event) => {
  mask.left = event.offsetX - maskEl.value.offsetWidth / 2;
  mask.top = event.offsetY - maskEl.value.offsetHeight / 2;
  if (mask.left < 0) mask.left = 0;
  if (mask.left > maskEl.value.offsetWidth)
    mask.left = maskEl.value.offsetWidth;
  if (mask.top < 0) mask.top = 0;
  if (mask.top > maskEl.value.offsetHeight)
    mask.top = maskEl.value.offsetHeight;
  big.left = -2 * mask.left;
  big.top = -2 * mask.top;
}, 30);

let imgIndex = ref(0)
// 自定义事件改变展示图片
$mittBus.on('changeShowImage',(index)=>{
  imgIndex.value = index
})
</script>


<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>