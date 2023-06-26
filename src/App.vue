<template>
  <a-layout style="height: 100%">
    <a-layout-sider>
      <side-menu></side-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header>
        <div class="title">THREE JS PRACTICE</div>
      </a-layout-header>
      <a-layout-content><router-view /></a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup>
import SideMenu from './components/SideMenu.vue'
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100vw;
}

.title {
  color: #fff;
  font-size: 16px;
  font-weight: bold;
}
</style>
