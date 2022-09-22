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
            <span class="time"> {{startData}} </span>
          </div>   
        </div>
        <div class="stay">共{{ stayCount }}晚</div>       
        <div class="end">
          <div class="data">
            <span class="tip">离店</span>
            <span class="time">{{endData}}</span>
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
  </div>
</template>

<script setup>
import useCityStore from "@/stores/modules/city";
import { ref } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router"
import {formatMonthDay, getDiffDays} from "@/utils/format_data" 
import useHomeStore from "@/stores/modules/home";


const router = useRouter()


//网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
const { hotSuggests } = storeToRefs(homeStore)

const cityClick = () => {
  router.push("/city")
}

const positionClick = () => {
  navigator.geolocation.getCurrentPosition(res => {
    console.log("success",res)
  })
}

const cityStore = useCityStore()
const {currentCity} = storeToRefs(cityStore)

const nowData = new Date()
const newData = new Date()
newData.setDate(nowData.getDate() + 1)

const startData = ref(formatMonthDay(nowData))
const endData = ref(formatMonthDay(newData))
const stayCount = ref(getDiffDays(nowData, newData))

const showCalendar = ref(false)
const onConfirm = (value) => {
  const selectStartData = value[0]
  const selectEndData = value[1]
  startData.value = formatMonthDay(selectStartData)
  endData.value = formatMonthDay(selectEndData)
  stayCount.value = getDiffDays(selectStartData, selectEndData)

  showCalendar.value = false
}
</script>

<style lang="less" scoped>
  .home {
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



      .item {
        padding: 4px 8px;
        // font-size: 12px;
        border-radius: 13px;
        margin: 3px;
      }
    }
  }
</style>

