<template>
  <TypeNav/>
  <ListContainer/>
  <TodyRecommend/>
  <CommodityRank/>
  <YouLike/>
  <HomeFloor v-for="list in floorList" :key="list.id" :list = "list"/>
  <HomeBrand/>
</template>

<script>
export default {
  name:"AppHome"
}
</script>
<script setup>
import ListContainer from './ListContainer'
import TodyRecommend from './TodyRecommend'
import CommodityRank from './CommodityRank'
import YouLike from './YouLike'
import HomeFloor from './HomeFloor'
import HomeBrand from './HomeBrand'
import { onMounted } from '@vue/runtime-core'
import { useStoreActions, useStoreState } from '@/store/storeMap'


const {getFloorList} = useStoreActions('home',['getFloorList'])
const {floorList} = useStoreState('home',['floorList'])

onMounted(()=>{
getFloorList();
})
</script>

<style>

</style>