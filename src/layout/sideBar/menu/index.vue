<template>
  <el-menu
    :collapse='!store.getters.sideBarType'
    router
    active-text-color='#3A98B9'
    text-color='#ffffff'
    background-color='#191825'
    unique-opened
    :default-active='defaultActive'
  >
    <SideBarItem :index='`${item.id}`' v-for='item in MenuList' :key='item.id' :item='item' />
  </el-menu>
</template>

<script setup>
import SideBarItem from '../sideBarItem'
import { getMenu } from '@/api/menu'
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const defaultActive = ref(sessionStorage.getItem('path') || '/users')
const MenuList = ref([])

const initMenuList = () => {
  getMenu().then(res => {
    MenuList.value = res.data
  })
}
initMenuList() // 加载菜单列表

</script>

<style scoped lang='scss'>
</style>
