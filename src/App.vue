<template>
  <div class="app">
    <router-view/>
    <tab-bar v-if="!route.meta.hideTabbar" />

  </div>
</template>

<script setup>

import TabBar from "@/components/tabBar/TabBar.vue"
import { useRoute } from "vue-router"

const route = useRoute()

</script>

<style lang="less" scoped>

</style>
