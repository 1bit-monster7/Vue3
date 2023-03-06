<template>
  <el-dropdown class='navbar-item'>
    <el-avatar :size='40' :src='avatar' />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click='handlerLogOut'>{{ $t('navbar.logOut') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup>
import avatar from '@/assets/avatar.jpg'
import { useStore } from 'vuex'
import { ElMessage, ElMessageBox } from 'element-plus'

const store = useStore()

const handlerLogOut = () => {
  ElMessageBox.confirm(
    'Please confirm whether you need to log out ？',
    {
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      type: 'warning'
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: 'log Out Successfully!'
      })
      store.dispatch('app/logOut')
    })
}
</script>
