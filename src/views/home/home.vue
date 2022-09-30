<template>
  <div class="home">
      <div class="nav-bar">
        <div class="title">陌陌旅途</div>
      </div>
      <div class="banner">
        <img src="@/assets/img/home/banner.webp" alt="">
      </div>
      <div class="location">
        <div class="city" @click="cityClick">{{currentCity.cityName}}</div>
        <div class="position" @click="positionClick">
          <span>我的位置</span>
          <img src="@/assets/img/home/icon_location.png" alt="">
        </div>
      </div>
      <div class="data-range" @click="showCalendar = true">
        <div class="start">
          <div class="data">
            <span class="tip">入住</span>
            <span class="time"> {{startDataStr}} </span>
          </div>   
        </div>
        <div class="stay">共{{ stayCount }}晚</div>       
        <div class="end">
          <div class="data">
            <span class="tip">离店</span>
            <span class="time">{{endDataStr}}</span>
          </div>
        </div>
      </div>
      <van-calendar 
      v-model:show="showCalendar" 
      type="range"
      @confirm="onConfirm"
      color="#ff9854" />

          <!-- 价格/人数选择 -->
      <div class="section price-counter bottom-gray-line">
        <div class="start">价格不限</div>
        <div class="end">人数不限</div>
      </div>
      <!-- 关键字 -->
      <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

      <div class="section hot-suggest">
        <template v-for="(item, index) in hotSuggests" :key="index">
          <div 
          class="item"
          :style="{ color: item.tagText.color,
            background: item.tagText.background.color} "
          > {{item.tagText.text}} </div>
        </template>
      </div>

      <!-- 搜索按钮 -->
      <div class="section search-btn">
        <div class="btn" @click="searchBtnClick">开始搜索</div>
      </div>
      <home-categories/>

      <div class="search-bar" v-if="isShowSearchBar">
        <search-bar></search-bar>
      </div>
      <home-content/>
      <!-- <button @click="house">加载</button> -->
  </div>
</template>

<script setup>
import useCityStore from "@/stores/modules/city";
import { ref } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router"
import {formatMonthDay, getDiffDays} from "@/utils/format_data" 
import useHomeStore from "@/stores/modules/home";
import useScroll from "@/hooks/useScroll"

import HomeCategories from "@/views/home/cpns/home-categories.vue"
import SearchBar from "@/components/search-bar/search-bar.vue"
import HomeContent from "./cpns/home-content.vue"
import { computed, onActivated, onMounted, onUnmounted, watch } from "@vue/runtime-core";
import useMainStore from "@/stores/modules/main";

const router = useRouter()


//网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
const { hotSuggests } = storeToRefs(homeStore)
homeStore.fetchCategoriesData()
let currentPage = 1
homeStore.fetchHouselistData(currentPage)



//城市跳转
const cityClick = () => {
  router.push("/city")
}

//获取本地城市
const positionClick = () => {
  navigator.geolocation.getCurrentPosition(res => {
    console.log("success",res)
  })
}

//城市仓库
const cityStore = useCityStore()
const {currentCity} = storeToRefs(cityStore)

//获取日期
// const nowData = new Date()
// const newData = new Date()
// newData.setDate(nowData.getDate() + 1)
const mainstore = useMainStore()
const { startData, endData } = storeToRefs(mainstore)

const startDataStr = computed(() => formatMonthDay(startData.value))
const endDataStr = computed(() => formatMonthDay(endData.value))
const stayCount = computed(() => getDiffDays(startData.value, endData.value))

const showCalendar = ref(false)
const onConfirm = (value) => {
  //设置日期
  const selectStartData = value[0]
  const selectEndData = value[1]
  mainstore.startData = selectStartData
  mainstore.endData = selectEndData
  stayCount.value = getDiffDays(selectStartData, selectEndData)

  showCalendar.value = false
}

//搜索按钮跳转
const searchBtnClick = () => {
  router.push({
    path: "/search",
    query: {
      startData: startData.value,
      endData: endData.value,
      currentCity: currentCity.value.cityName
    }
  }
  )
}

//加载列表
function house()  {
  currentPage++
  homeStore.fetchHouselistData(currentPage)
}

//下拉加载数据
useScroll( () => {
  house()
})

//下拉出现搜索框
const { scrollTop } = useScroll()
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//   isShowSearchBar.value = newTop > 100
// })

const isShowSearchBar = computed(() => {
  return scrollTop.value >= 100
})

</script>

<style lang="less" scoped>
  .home {
    padding-bottom: 60px;

    .nav-bar {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 46px;
      border-bottom: 1px solid #f2f2f2;

      .title {
        color: var(--primary-color);
        font-size: 18px;
        font-weight: 700;
      }
    }

    .banner {
      img {
        width: 100%;
      }    
    }

    .location {
      display: flex;
      align-items: center;
      height: 44px;
      padding: 0 20px;

      .city {
        flex: 1;
      }

      .position {
        width: 74px;

        img {
          width: 18px;
          height: 18px;
        }
      }
    }

    .data-range {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      height: 40px;
      padding-right: 50px;


      .data {
        display: flex;
        flex-direction: column;
      }
      .tip {
        font-size: 12px;
        color: #c1babd;
      }
    }

    .section {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      font-size: 12px;
      height: 44px;
      color: #c1babd;
      padding: 0 20px;
    }


    .price-counter {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      padding-right: 50px;

      .start {
        border-right: 1px solid #f2f2f2;
      }
    }

    .keyword {
      padding: 0 20px;
      padding-right: 50px;
    }

    .hot-suggest {
      margin: 10px 0;
      height: auto;

      .item {
        padding: 4px 8px;
        // font-size: 12px;
        border-radius: 13px;
        margin: 3px;
      }
    }

    .search-btn {
      .btn {
        width: 342px;
        height: 38px;
        max-height: 50px;
        font-weight: 500;
        font-size: 18px;
        line-height: 38px;
        text-align: center;
        border-radius: 20px;
        color: #fff;
        background-image: var(--theme-linear-gradient);
      }
    }

    .search-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      padding: 16px 16px 10px 16px;
      background-color: white;
      z-index: 100;
    }
  }
</style>

