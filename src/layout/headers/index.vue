<template>
  <div class='navbar'>
    <HamburgerSwitch />
    <Crumbs />
    <div class='navbar-right'>
      <ScreenFull class='navbar-item' />
      <Lang class='navbar-item' />
      <Avatar class='navbar-item' />
    </div>
  </div>
</template>

<script setup>
import HamburgerSwitch from './components/hamBurgerSwitch'
import Crumbs from './components/crumbs'
import Avatar from './components/avatar'
import Lang from './components/lang'
import ScreenFull from './components/screenFull'
</script>

<style lang='scss' scoped>
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #fff;
  padding: 0 16px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  box-sizing: border-box;
  position: relative;
  align-items: center;

  .navbar-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    :deep(.navbar-item) {
      display: inline-block;
      margin-left: 18px;
      font-size: 22px;
      color: #5a5e66;
      box-sizing: border-box;
      cursor: pointer;
    }

    :deep(.el-avatar) {
      cursor: pointer;
    }
  }
}
</style>
