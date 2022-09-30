import { defineStore } from "pinia";

const startData = new Date()
const endData = new Date()
endData.setDate(startData.getDate() + 1)

const useMainStore = defineStore("main", {
  state: () =>  ({
    token: "",

    startData: startData,
    endData: endData
  }) ,
})

export default useMainStore