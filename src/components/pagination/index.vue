<template>
  <div class="pagination">
    <button :disabled="prevPageIsShow" @click="prevPage">上一页</button>
    <button v-show="firstPaginationIsShow" :class="{ active: prevPageIsShow }" @click="toPage(1)">
      1
    </button>
    <button v-show="firstMoreIsShow">•••</button>

    <button
      v-for="(num, index) in startNumToEndNum"
      :key="index"
      :class="{ active: props.pageNo == num }"
      @click="toPage(num)"
    >
      {{ num }}
    </button>

    <button v-show="lastMoreIsShow">•••</button>
    <button v-show="lastPaginationIsShow" :class="{ active: nextPageIsShow }" @click="toPage(totalPage)">
      {{ totalPage }}
    </button>
    <button :disabled="nextPageIsShow" @click="nextPage">下一页</button>

    <button style="margin-left: 30px">共 {{ totalPage }} 条</button>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  name: "BasePagination",
};
</script>
<script setup>
const props = defineProps(["pageNo", "pageSize", "total", "continues"]);

// 总页数
const totalPage = computed(() => Math.ceil(props.total / props.pageSize));

const startNumToEndNum = computed(() => {
  let startNum = 0;
  let endNum = 0;
  let startNumToEndNum = [];
  if (props.continues > totalPage.value) {
    startNum = 1;
    endNum = totalPage.value;
  } else {
    startNum = props.pageNo - parseInt(props.continues / 2);
    endNum = props.pageNo + parseInt(props.continues / 2);
    if (startNum < 2) {
      startNum = 1;
      endNum = props.continues;
    }
    if (endNum > totalPage.value) {
      startNum = totalPage.value - props.continues;
      endNum = totalPage.value;
    }
  }
  for (let i = startNum; i < endNum + 1; i++) {
    startNumToEndNum.push(i);
  }
  return startNumToEndNum;
});
// 第一页，第一个省略号是否显示
const firstPaginationIsShow = computed(() => startNumToEndNum.value[0] > 1);
const firstMoreIsShow = computed(() => startNumToEndNum.value[0] > 2);

// 最后页，最后个省略号是否显示
const lastMoreIsShow = computed(
  () =>
    startNumToEndNum.value[startNumToEndNum.value.length - 1] <
    totalPage.value - 1
);
const lastPaginationIsShow = computed(
  () =>
    startNumToEndNum.value[startNumToEndNum.value.length - 1] < totalPage.value
);

// 上一页，下一页是否显示
const prevPageIsShow = computed(() => props.pageNo == 1 || props.totalPage == 0);
const nextPageIsShow = computed(() => props.pageNo == totalPage.value || totalPage.value == 0);

// 上一页，下一页事件
const emits = defineEmits(['changePage'])
function prevPage(){
  emits('changePage',props.pageNo - 1)
}
function nextPage(){
  emits('changePage',props.pageNo +1)
}

function toPage(page){
  if(page == props.pageNo) return
  emits('changePage',page)
}
</script>


<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #ff6700;
      color: #fff;
    }
  }
}
</style>
