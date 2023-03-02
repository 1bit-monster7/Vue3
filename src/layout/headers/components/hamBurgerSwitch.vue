<template>
  <div class='hamburger-container' @click='changeSideBarType'>
    <ElIcon :size='24'>
      <Fold v-if='sideType' />
      <Expand v-else />
    </ElIcon>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

const sideType = computed(() => {
  return store.getters.sideBarType
})

const changeSideBarType = () => {
  console.log('dispatch')
  store.commit('app/changeSideBarType')
}
</script>

<style scoped lang='scss'>
.hamburger-container {
  cursor: pointer;
  box-sizing: border-box;
  margin-right: 16px;
}
</style>
