import { onMounted, onUnmounted } from "@vue/runtime-core";
import { ref } from "@vue/reactivity";
import { throttle } from 'underscore'


export default function useScroll( CB) {
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  const scrollListenerHandler = throttle(() => {
    clientHeight.value = document.documentElement.clientHeight
    scrollTop.value = document.documentElement.scrollTop
    scrollHeight.value = document.documentElement.scrollHeight
    console.log("监听到滚动")
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      console.log("到底部了")
      if (CB) CB()
    }
  },500)
  
  onMounted(() => {
    window.addEventListener("scroll", scrollListenerHandler)
  })
  
  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListenerHandler)
  })

  return { clientHeight, scrollTop, scrollHeight }
}