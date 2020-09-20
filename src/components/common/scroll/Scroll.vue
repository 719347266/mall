<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
      name: "Scroll",
      props:{
        probeType:{
          type:Number,
          default:0
        },
        pullUpLoad:{
          type: Boolean,
          default: false
        }
      },
      data(){
        return{
          scroll:null
        }
      },
      mounted() {
        this.scroll = new BScroll(this.$refs.wrapper,{
          probeType:this.probeType,
          pullUpLoad:this.pullUpLoad,
          click:true
        })
        //不封装写法
        // this.scroll.scrollTo(0,0)

        this.scroll.on('scroll',(position)=>{
          // console.log(position)
          this.$emit('scroll',position)
        })
        if (this.pullUpLoad){
        this.scroll.on('pullingUp',()=>{
          // console.log('上拉刷新')
          // scroll.finishPullUp()
          this.$emit('pullingUp')
        })}
      },
      methods:{
        //封装写法
        scrollTo(x,y,time=300){
          this.scroll && this.scroll.scrollTo(x,y,time)
        },
        finishpullup(){
          this.scroll.finishPullUp()
        },
        refresh() {
          console.log('--')
          this.scroll && this.scroll.refresh()
        },
        getScrollY() {
          return this.scroll ? this.scroll.y : 0
        }
      }
    }
</script>

<style scoped>

</style>
