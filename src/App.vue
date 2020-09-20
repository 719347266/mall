<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <MainTabBar class="maintabbar"></MainTabBar>
  </div>
</template>
  <script>
    import MainTabBar from 'components/content/mainTabbar/MainTabBar'
    export default {
      name:'app',
      components:{
        MainTabBar
      }
    }
  </script>
<style>
@import "assets/css/base.css";
* {touch-action: pan-y;}
</style>
