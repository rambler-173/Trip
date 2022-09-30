<template>
  <div class="city-group">
    <van-index-bar :index-list="indexList">  
        <van-index-anchor index="热门" />
        <div class="hot">
          <template v-for="item in groupData.hotCities">
          <div class="city" @click="cityClick(item)">{{item.cityName}}</div>
        </template>
        </div>
        

          <template v-for="(group, index) in groupData.cities" :key="index">
            <van-index-anchor :index="group.group" />
            <template v-for="(city, indey) in group.cities" :key="indey">
              <van-cell :title="city.cityName" @click="cityClick(city)" />
            </template>
          </template>
    </van-index-bar>


  </div>
</template>

<script setup>
import useCityStore from "@/stores/modules/city"
import { computed } from "@vue/runtime-core"
import { useRouter } from "vue-router"


const props = defineProps({
  groupData: {
    type: Object,
    default: () => ({})
  }
})

const indexList =  computed(() => {
  const list = props.groupData.cities.map(item => item.group)
  list.unshift("#")
  return list
})

const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city) => {

  //将获取的数据传入仓库
  cityStore.currentCity = city
  console.log(city)

  router.back()
}
</script>

<style lang="less" scoped>

.hot {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 10px;
  padding-right: 25px;

  .city {
  width: 70px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  background-color: #fff4ec;
  border-radius: 25px;
  margin-top: 6px;
  }
}


</style>
