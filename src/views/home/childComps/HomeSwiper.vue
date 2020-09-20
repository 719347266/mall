<template>
    <div>
      <Swiper >
        <Swiper-Item v-for="item in banners">
          <a :href="item.link">
            <img :src="item.image" @load="swiperimg">
          </a>
        </Swiper-Item>
      </Swiper>
    </div>
</template>

<script>
  import Swiper from "components/common/swiper/Swiper";
  import SwiperItem from "components/common/swiper/SwiperItem";

    export default {
      name: "HomeSwiper",
      props: {
        banners:{
          type:Array,
          default(){
            return[]
          }
        }
      },
      data(){
        return{
          ImgLoad : false
        }
      },
     components:{
        Swiper,
        SwiperItem
      },
      methods:{
        swiperimg(){
          // console.log('图片加载完成')
          if (!this.ImgLoad){
            this.$emit('swiperImgload')
            this.ImgLoad = true
          }
        }
      }
    }
</script>

<style scoped>

</style>
