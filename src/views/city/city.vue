<template>
  <div class="city top-page">
    <div class="top">
      <van-search 
        v-model="searchValue" 
        placeholder="城市/区域/位置"
        shape="round"
        show-action
        @cancel="cancelClick"
      />

      
      <van-tabs v-model:active="tabActive" color="#ff9854">
        <template v-for="(value, key, index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    
    <div class="content">
      <template v-for="(value, key, index) in allCities">
        <CityGroup v-show="tabActive === key" :group-data="value" />
      </template>
      
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';

import CityGroup  from './cpns/city-group.vue'


const router = useRouter()

//搜索栏功能
const cancelClick = () => {
  router.back()
}
const searchValue = ref()

//tab的切换
const tabActive = ref()

//网络请求
// const allCity = ref({})
// getCityAll().then(res => {
//   allCity.value = res.data
// })

//从store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

//获取选中标签后的数据
const currentGroup = computed(() => allCities.value[tabActive.value])
</script>

<style lang="less" scoped>

.city {

  // .top {
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  // }
  .top {
    position: relative;
    z-index: 9;
  }

  .content {
    height: calc(100vh - 98px);
    overflow-y: auto;
  }
}

</style>
