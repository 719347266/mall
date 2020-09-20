<template>
  <div id="detail1">
      <detail-nab-bar class="detail-nav"
                      @detailClick="detailClick"
                      :getThemetopY="getThemetopY" ref="nav" />
      <scroll class="content1" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :top-images="topImages" :title="title"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo "/>
      <detail-comment-info :comment-info="commentInfo" ref="aaa"/>
      <GoodsList ref="goods" :goods="recommends"/>

    </scroll>
    <back-top @click.native="btnclick" v-show="isShow"/>
    <DetailBottomBar @addToCart="addToCart"/>
    <toast :message="message" :show="show"/>
  </div>
</template>

<script>
  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail'
  import DetailNabBar from "./childComps/DetailNabBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodsList from "../../components/content/goods/GoodsList";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import BackTop from "../../components/content/backTop/BackTop";
  import Scroll from "components/common/scroll/Scroll";
  import debounce from '../../common/utils'
  import {mapActions} from 'vuex'

  import Toast from "../../components/common/toast/Toast";

    export default {
      name: "Detail",
      components:{
        DetailSwiper,
        DetailNabBar,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        Scroll,
        GoodsParam,
        GoodsList,
        BackTop,
        Toast,
      },
      data(){
        return{
          iid:null,
          result:"",
          topImages:[],
          title:'',
          goods:{},
          shop:{},
          detailInfo:{},
          paramInfo:{},
          commentInfo:{},
          recommends:[],
          detailYs:[],
          getThemetopY:{},
          itemImgListener:null,
          positionY:0,
          currentIndex:0,
          isShow : false,
          message:'',
          show:false
        }
      },
      created() {
        // console.log(this.$route.params.iid)
        this.iid = this.$route.params.iid
        //获取商品详情数据
        getDetail(this.iid).then(res=>{
          console.log(res)
          const data = res.result
          this.topImages = data.itemInfo.topImages
          //获取商品信息
          this.goods = new Goods(data.itemInfo, data.columns , data.shopInfo.services)
          // console.log(this.goods)
          //获取店铺信息
          this.shop = new Shop(data.shopInfo);
          //获取详情信息
          this.detailInfo = data.detailInfo
          //获取参数信息
          this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
          //获取评论信息
          if (data.rate.cRate !== 0) {
            this.commentInfo = data.rate.list[0];
          }

          // this.$nextTick(()=>{
          //   this.detailYs = []
          //
          //   this.detailYs.push(0)
          //   this.detailYs.push(this.$refs.params.$el.offsetTop)
          //   this.detailYs.push(this.$refs.aaa.$el.offsetTop)
          //   this.detailYs.push(this.$refs.goods.$el.offsetTop)
          //   console.log(this.detailYs)
          // })
          this.getThemetopY = debounce(() =>{
            this.$refs.scroll.refresh()
            this.detailYs = []
            this.detailYs.push(0)
            this.detailYs.push(this.$refs.params.$el.offsetTop)
            this.detailYs.push(this.$refs.aaa.$el.offsetTop)
            this.detailYs.push(this.$refs.goods.$el.offsetTop)
            this.detailYs.push(Number.MAX_VALUE)
            console.log(this.detailYs)
          },100)
        })
            //获取推荐数据
          getRecommend().then(res=>{
            // console.log(res);
            this.recommends = res.data.list
            // console.log(this.recommends)
          })
      },
      methods:{
          ...mapActions(['addCart']),
        addToCart(){
          const product = {}
          product.image = this.topImages[0]
          product.title = this.goods.title
          product.desc = this.goods.desc
          product.price = this.goods.realPrice
          product.iid = this.iid

          //mapActions映射写法
          // this.addCart(product).then(res=>{
          //   console.log(res)
          // })

          this.$store.dispatch('addCart',product).then(res=>{
            console.log(res);
            this.show = true
            this.message = res

            setTimeout(()=>{
              this.show = false
              this.message = ''
            },1500)
          })
        },
        btnclick(){
          this.$refs.scroll.scrollTo(0,0)
        },
        imageLoad(){
          console.log('图片加载完成 刷新一次')
          this.getThemetopY()

        },
        detailClick(index){
          console.log(index)
          this.$refs.scroll.scrollTo(0,-this.detailYs[index],500)
        },
        contentScroll(position){
          this.isShow = (-position.y) > 1000
          this.positionY = -position.y
          let length = this.detailYs.length
          for (let i = 0 ; i<length-1 ; i++){
            // if (this.currentIndex !== i && (positionY >= this.detailYs[i]
            //   && positionY < this.detailYs[i+1])){
            //   this.currentIndex = i
            //   this.$refs.nav.currentIndex = this.currentIndex
            // }
            // console.log(i)
            // if (this.currentIndex !== i &&((i<length-1&& positionY >= this.detailYs[i]
            //   && positionY <this.detailYs[i+1] ) || (i === length -1 && positionY >= this.detailYs[i] ))){
            //     this.currentIndex = i
            //     this.$refs.nav.currentIndex = this.currentIndex
            // }
          }
        }
      },
      mounted() {
        const refresh = debounce(this.$refs.scroll.refresh,50)
        this.itemImgListener = () => {
          refresh()
        }
         this.$bus.$on('itemImgaLoad',this.itemImgListener)
      },
      destroyed() {
        this.$bus.$off('itemImgaLoad',this.itemImgListener)
      }
    }
</script>

<style scoped>
  #detail1{
    position: relative;
    z-index: 9;
    background: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    background: #ffffff;
    z-index: 9;
  }

  .content1{
    height: calc(100% - 44px - 49px);
  }
</style>
