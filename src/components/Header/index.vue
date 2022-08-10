<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userInfo.name">
            <span>请</span>
            <router-link
              :to="{
                name: 'login',
              }"
              >登录</router-link
            >
            <router-link
              class="register"
              :to="{
                name: 'register',
              }"
              >免费注册</router-link
            >
          </p>
          <p v-else>
            <a>{{userInfo.name}}</a>
            <a class="register" @click="userLogout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link :to="{name:'center'}">我的订单</router-link>
          <router-link class="sui-btn btn-xlarge" :to="{name:'shopcart'}">去购物车结算</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link
          class="logo"
          title="尚品汇"
          :to="{
            name: 'home',
          }"
        >
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model.trim="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch()"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>
<script setup>
import { ref } from "@vue/reactivity";
import { useRouter, useRoute } from "vue-router";
import $mittBus from "@/mitt";
import { useStoreActions, useStoreState } from '@/store/storeMap';

const router = useRouter();
const route = useRoute();
// 搜索框关键词
const keyword = ref("");

// 搜索按钮点击事件，判断路由是否包含query参数并合并参数跳转路由
function goSearch() {
  let location = { name: "search", params: { keyword: keyword.value } };
  if (route.query.categoryName) {
    location.query = route.query;
  }
  router.push(location);
}

// 定义全局事件总线
$mittBus.on("clearKeyword",(value)=>{
  keyword.value = value
})

const {userInfo} = useStoreState('login',['userInfo'])
const {logout} = useStoreActions('login',['logout'])

// 退出登录事件
async function userLogout(){
  try {
    await logout()
    router.push({name:'home'})
  } catch (error) {
    alert(error)
  }
}
</script>


<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>