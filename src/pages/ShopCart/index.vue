<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="sku in cartInfoList" :key="sku.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="sku.isChecked == 1" @change="changeChecked(sku.skuId)"/>
          </li>
          <li class="cart-list-con2">
            <img :src="sku.imgUrl" />
            <div class="item-msg">
              {{sku.skuName}}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{sku.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeShopCartSkuNum('mins',sku)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="sku.skuNum"
              minnum="1"
              class="itxt"
              @change="changeShopCartSkuNum('change',sku)"
            />
            <a href="javascript:void(0)" class="plus" @click="changeShopCartSkuNum('add',sku)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{sku.cartPrice * sku.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteShop(sku.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isCheckedAll" @change="changeAllChacked"/>
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedShop">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" :to="{name:'trade'}">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShopCart",
};
</script>
<script setup>
import { computed, onMounted } from "@vue/runtime-core";
import { useStoreActions, useStoreGetters } from "@/store/storeMap";
import throttle from 'lodash/throttle'

// 解构shopcart里所有action
const { 
      getShopCartList,
      changeSkuChecked,
      changeAllSkuChecked,
      deleteIsCheckedShop,
      deleteAllIsCheckedshop 
      } = useStoreActions("shopcart", [
        "getShopCartList",
        "changeSkuChecked",
        "changeAllSkuChecked",
        "deleteIsCheckedShop",
        "deleteAllIsCheckedshop"
        ]);
const { addOrUpdataShopCart } = useStoreActions("detail", ["addOrUpdataShopCart"]);
const { cartInfoList} = useStoreGetters('shopcart',['cartInfoList'])

// 总价钱
const totalPrice = computed(()=>{
  let count = 0
  cartInfoList.value.forEach(item=>{
    count += item.skuPrice * item.skuNum
  })
  return count
})
// 商品选择框事件
async function changeChecked(skuId){
  let isChecked = event.target.checked?1:0
  try {
    await changeSkuChecked({skuId,isChecked})
    getShopCartList()
  } catch (error) {
    alert(error)
  }
}

//全选框绑定动态属性
const isCheckedAll = computed(()=>cartInfoList.value.every(item=>item.isChecked == 1) && cartInfoList.value.length != 0)
// 全选框事件
async function changeAllChacked(event){
  let isChecked = event.target.checked?1:0
 try {
    await changeAllSkuChecked(isChecked)
    getShopCartList()
 } catch (error) {
  alert(error)
 }
}
// 商品加购数量改变事件
const changeShopCartSkuNum = throttle(async(type,sku)=>{
  let isNum = 0
  let value
  switch(type){
    case 'add':
      isNum = 1
      break
    case 'mins':
      isNum = sku.skuNum > 1?-1:0
      break
    case 'change':
      value = event.target.value*1
      if(isNaN(value) || value < 1){
        isNum = 0
      }else{
        isNum = parseInt(value)-sku.skuNum
      }
      break
  }
  try {
    await addOrUpdataShopCart({skuId:sku.skuId,skuNum:isNum})
    getShopCartList();  
  } catch (error) {
    alert('更新购物车失败')
  }
},1000)

// 删除商品事件
async function deleteShop(skuId){
  try {
    await deleteIsCheckedShop(skuId)
    getShopCartList()
  } catch (error) {
    alert(error)
  }
}

// 删除所有选中商品事件
async function deleteAllCheckedShop(){
  try {
   await deleteAllIsCheckedshop()
   getShopCartList()
  } catch (error) {
    alert(error)
  }
  
}
onMounted(() => {
  getShopCartList();

});
</script>


<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>