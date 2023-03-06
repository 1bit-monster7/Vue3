<template>
  <div @click='handleFullScreen'>
    <svg-icon :icon='isFullscreen?"exit-fullscreen":"fullscreen"'></svg-icon>
  </div>
</template>

<script setup>
import screenfull from 'screenfull'
import { ref, onMounted, onBeforeMount, onBeforeUnmount } from 'vue'

const isFullscreen = ref(screenfull.isFullscreen)
const handleFullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
  }
}

const changeIcon = () => {
  isFullscreen.value = screenfull.isFullscreen
}

onMounted(() => {
  screenfull.on('change', changeIcon)
})

onBeforeUnmount(() => {
  screenfull.off('change')
})

</script>

<style scoped>

</style>
