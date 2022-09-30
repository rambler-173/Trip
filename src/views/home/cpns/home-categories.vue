<template>
  <div class="categories">
      <template v-for="item in categories" >
        <div class="item">
          <img :src="item.pictureUrl" alt="">
          <div class="title"> {{item.title}} </div>
        </div>
    </template>
  </div>
</template>

<script setup>
import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';


const homeStore = useHomeStore()
const { categories } = storeToRefs(homeStore)
</script>

<style lang="less" scoped>
.categories {
  display: flex;
  overflow-x: auto;
  height: 50px;
  padding: 0 10px;
  margin-top: 8px;

  .item {
    width: 70px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;

    img {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
