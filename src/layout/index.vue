<template>
  <el-container class='app-wrapper'>
    <el-aside :width='widthStyle' class='sidebar-container'>
      <Menu />
    </el-aside>
    <el-container :class='{"hidderContainer":!store.getters.sideBarType}' class='container'>
      <el-header>
        <Headers />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Menu from './sideBar/menu'
import Headers from './headers'
import { useStore } from 'vuex'
import { computed } from 'vue'
import variables from '@/styles/variables.module.scss'

const store = useStore()
const widthStyle = computed(() => {
  return store.getters.sideBarType ? variables.sideBarWidth : variables.hideSideBarWidth
})

</script>

<style lang='scss' scoped>
.app-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.container {
  width: calc(100% - $sideBarWidth);
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;

  &.hidderContainer {
    width: calc(100% - $hideSideBarWidth);
  }
}

:deep(.el-header) {
  padding: 0;
}
</style>
