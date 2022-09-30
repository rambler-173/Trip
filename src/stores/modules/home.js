import { getHomeHotSuggests, getHomeCategories, getHomeHouselist } from "@/services";
import { defineStore } from "pinia";

const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: [],
    
    houselist: []
  }),
  actions: {
    async fetchHotSuggestData() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchCategoriesData() {
      const res = await getHomeCategories()
      this.categories = res.data
    },
    async fetchHouselistData(currentPage) {
      
      const res = await getHomeHouselist(currentPage)
      this.houselist.push(...res.data)
      
    }
  }
})

export default useHomeStore