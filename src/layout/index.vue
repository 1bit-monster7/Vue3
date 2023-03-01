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

const store = useStore()

const widthStyle = computed(() => {
  const a = store.getters.sideBarType ? '210px' : '67px'
  console.log(a, 'a')
  return a
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
  background: red;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;

  &.hidderContainer {
    width: calc(100% - $hideSideBarWidth);
  }
}

::v-deep .el-header {
  padding: 0;
}
</style>
