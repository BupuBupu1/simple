<template>
  <div id="app">
    <Nav></Nav>
    <BackTop></BackTop>
    <router-view></router-view>
  </div>
</template>
<script>
import Nav from './views/nav';
import Bottom from './views/bottom';
export default {
  components: {
    Nav,
    Bottom,
  },
};
</script>
<style src="./assets/global.scss" lang="scss"></style>
<style src="./assets/icon/iconfont.css"></style>
