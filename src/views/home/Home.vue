<template>
  <div id="home">
    <NavBar class="home-nav"><div slot="center">购物街</div></NavBar>

    <tab-control :title="['流行','新款','精选']"
                 class="tab-control"
                 @tabclick="tabclick"
                 ref="tabControl1" v-show="isTabFixed"/>

    <scroll class="content" ref="scroll" :probe-type="3" @scroll="Scrollclick"
             :pull-up-load="true" @pullingUp="pullclick">
      <home-swiper :banners="banners" @swiperImgload="swiperImgload"></home-swiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <feature-view/>
      <tab-control :title="['流行','新款','精选']"
                   @tabclick="tabclick" ref="tabControl2"/>
      <goods-list :goods="goods[currentType].list"/>
    </scroll>
    <back-top @click.native="btnclick" v-show="isShow"/>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getHomeMultidata,getHomeGoods} from "network/home";
  import debounce from '../../common/utils'

  import Scroll from "../../components/common/scroll/Scroll";

  export default {
    name: "Home",
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data(){
      return{
        result:null,
        banners:[],
        recommends:[],
        goods:{
          'pop': {page: 0,list:[]},
          'new': {page: 0,list:[]},
          'sell':{page: 0,list:[]}
        },
          currentType:'pop',
          isShow : false,
          taboffsetTop:0,
          isTabFixed : false,
          saveY : 0,
          itemImgListener:null
      }
    },
    activated(){
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0,this.saveY,0)
    },
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY()
      // console.log(this.saveY)
      //取消全局事件监听
      this.$bus.$off('itemImgaLoad',this.itemImgListener)
    },
    created() {
      //请求多个数据
      this.getHomeMultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
      // this.taboffsetTop = this.off
      // console.log(this.off)
      const refresh = debounce(this.$refs.scroll.refresh,50)
      this.itemImgListener = () => {
        refresh()
      }
      this.$bus.$on('homeImgaLoad',this.itemImgListener)
    },
    methods:{
      //事件监听相关方法
      tabclick(index){
        // console.log(index);
        switch (index) {
          case 0 :
            this.currentType = 'pop'
                break
          case 1 :
            this.currentType = 'new'
                break
          case 2:
            this.currentType = 'sell'
                break
        }
        this.$refs.tabControl1.currentindex = index
        this.$refs.tabControl2.currentindex = index
      },
      //监听组件按钮
      btnclick(){
        this.$refs.scroll.scrollTo(0,0)
      },
      Scrollclick(position){
        // console.log(position)
        this.isShow = (-position.y) > 1000
        this.isTabFixed = (-position.y) > this.taboffsetTop
      },
      pullclick(){
        console.log('上拉刷新')
        this.getHomeGoods(this.currentType)
        // this.$refs.scroll.scroll.refresh()
      },
      //网络请求相关方法
      getHomeMultidata(){
        getHomeMultidata().then(res=>{
          console.log(res);
          // this.result = res
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res=>{
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishpullup()
        })
      },
      //监听图片加载事件
      swiperImgload(){
          this.taboffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }

  .tab-control {
    position: relative;
    /*top: 44px;*/
    z-index: 9;
  }

  .content {
    overflow: hidden;
    height: calc(100% - 93px);
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  /*.content {*/
  /*height: calc(100% - 93px);*/
  /*overflow: hidden;*/
  /*margin-top: 44px;*/
  /*}*/
</style>
