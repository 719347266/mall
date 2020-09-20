<template>
  <div>
<!--    导航-->
    <nav-bar class="Sho-nav">
      <div slot="center" >购物车({{cartLength}})</div>
    </nav-bar>
<!--    商品列表-->
    <cart-list/>
<!--    底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import CartBottomBar from "./childComps/CartBottomBar";
  import CartList from "./childComps/CartList";
  import { mapGetters } from 'vuex'

  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .Sho-nav{
    background: pink;
  }
</style>
