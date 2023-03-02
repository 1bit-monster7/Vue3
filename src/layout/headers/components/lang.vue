<template>
  <el-dropdown @command='handleCommand'>
    <svg-icon icon='language'></svg-icon>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command='zh' :disabled="currentLanguage === 'zh'"
        >中文
        </el-dropdown-item
        >
        <el-dropdown-item command='en' :disabled="currentLanguage === 'en'"
        >English
        </el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import i18n from '@/i18n'

import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const {
  locale
} = i18n.global

const handleCommand = (val) => {
  locale.value = val
  store.commit('app/changLang', val)
  localStorage.setItem('lang', val)
}
const currentLanguage = computed(() => {
  return store.getters.lang
})

</script>
