<template >
  <div class="tab-bar">
    <van-tabbar v-model="currentindex" active-color="#ff9854">
    <template v-for="(item, index) in tabbarData">
      <van-tabbar-item :to="item.path">
        <span>{{ item.text }}</span>
        <template #icon="props">
          <img v-if="currentindex !== index" :src="getAssetURL(item.image)" alt="">
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
import {ref} from "vue"


const currentindex = ref(0)


</script>

<style lang="less" scoped>

.tab-bar {
  img {
    height: 36px;
  }
}

</style>
