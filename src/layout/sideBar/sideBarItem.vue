<template>
  <!--拥有子级菜单-->
  <el-sub-menu v-if='includeSubRoutes' :index='`${item.id}`'>
    <template #title>
      <el-icon>
        <Edit />
      </el-icon>
      <span>{{ item.authName }}</span>
    </template>
    <side-bar-item v-for='son in item.children' :key='son.id' :item='son' />
  </el-sub-menu>
  <!--没有子级菜单-->
  <el-menu-item v-else :index="'/'+item.path" @click='savePath(item.path)'>
    <el-icon>
      <Edit />
    </el-icon>
    <span>{{ item.authName }}</span>
  </el-menu-item>
</template>

<script setup>
import { computed } from 'vue'
// eslint-disable-next-line no-undef
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isCollapse: {
    type: Boolean,
    default: false
  },
  isFirstLevel: {
    type: Boolean,
    default: true
  },
  basePath: {
    type: String,
    default: ''
  }
})

const includeSubRoutes = computed(() => {
  const { item } = props
  return item?.children.length
})

const savePath = (path) => {
  sessionStorage.setItem('path', '/' + path)
}

</script>

<style scoped lang='scss'>
</style>
