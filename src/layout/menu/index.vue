<template>
  <el-menu
    router
    active-text-color='#3A98B9'
    text-color='#ffffff'
    background-color='#191825'
    unique-opened
    :default-active='defaultActive'
  >
    <el-sub-menu :index='`${item.id}`' v-for='item in MenuList' :key='item.id'>
      <template #title>
        <span>{{ item.authName }}</span>
      </template>
      <el-menu-item @click='savePath(son.path)' v-for='son in item.children' :key='son.id' :index="'/'+son.path">
        {{ son.authName }}
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { getMenu } from '@/api/menu'
import { ref } from 'vue'

const defaultActive = ref(sessionStorage.getItem('path') || '/users')
const MenuList = ref([])

const initMenuList = () => {
  getMenu().then(res => {
    MenuList.value = res
  })
}
initMenuList() // 加载菜单列表

const savePath = (path) => {
  sessionStorage.setItem('path', '/' + path)
}
</script>

<style scoped>

</style>
