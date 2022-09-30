<template >
  <div class="tab-bar">
    <van-tabbar v-model="currentIndex" active-color="#ff9854">
    <template v-for="(item, index) in tabbarData">
      <van-tabbar-item :to="item.path">
        <span>{{ item.text }}</span>
        <template #icon="props">
          <img v-if="currentIndex !== index" :src="getAssetURL(item.image)" alt="">
          <img v-else :src="getAssetURL(item.imageActive)" alt="">
        </template>
      </van-tabbar-item>
    </template>
    </van-tabbar>
  </div>
</template>

<script setup>

import tabbarData from "@/assets/data/tabbar"
import {getAssetURL} from "@/utils/get_assets_img"
import {ref, watch} from "vue"
import { useRoute } from "vue-router"


const currentIndex = ref(0)

const route = useRoute()
watch(route, (newRoute) => {
  const index = tabbarData.findIndex(item => item.path === newRoute.path)
  if(index === -1 ) return
  console.log(index)
  currentIndex.value = index
})

</script>

<style lang="less" scoped>

.tab-bar {
  img {
    height: 36px;
  }
}

</style>
