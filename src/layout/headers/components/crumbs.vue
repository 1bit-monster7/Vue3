<template>
  <el-breadcrumb separator='/'>
    <el-breadcrumb-item :to='item.path' v-for='item in route.matched' :key='item.path'>{{item.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route.matched, 'route')
</script>

<style scoped>

</style>
