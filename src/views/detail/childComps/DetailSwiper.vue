<template>
<div>
  <swiper class="Swiper">
      <swiper-item v-for="item in topImages">
        <img :src="item">
      </swiper-item>
  </swiper>
  <div></div>
</div>
</template>

<script>
  import Swiper from "components/common/swiper/Swiper";
  import SwiperItem from "components/common/swiper/SwiperItem";
    export default {
      name: "DetailSwiper",
      props:{
        topImages:{
          type:Array,
          default(){
            return[]
          }
        },
        title:{
          type: String,
          default() {
            return '';
          }
        }
      },
      components:{
        SwiperItem,
        Swiper
      }
    }
</script>

<style scoped>
  .Swiper{
    height: 350px;
    /*overflow: hidden;*/
  }
</style>
