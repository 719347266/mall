<template>
    <div class="cart-item">
      <scroll class="content">
      <cart-list-item v-for="(item,index) in cartList"
                      :key="index.iid"
                      :product="item"/>
      </scroll>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import CartListItem from "./CartListItem";
  import Scroll from "../../../components/common/scroll/Scroll";
    export default {
      name: "CartList",
      components:{
        Scroll,
        CartListItem
      },
      computed:{
          ...mapGetters([
            'cartLength',
            'cartList'
          ])
      }
    }
</script>

<style scoped>
  .cart-item{
    height: 86vh;
  }
  .content{
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
</style>
