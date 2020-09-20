<template>
  <div id="detail">
    <nav-bar>
      <div slot="left" class="back" @click="backclick">
        <img src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" class="title-item"
             :class="{active:currentIndex===index}"
             @click="detailclick(index)">{{item}} </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
    export default {
      name: "DetailNabBar",
      // props:{
      //   getThemetopY:{
      //     type:Object
      //   }
      // },
      components:{
          NavBar
      },
      data(){
        return{
          titles:['商品','参数','评论','推荐'],
          currentIndex:0,

        }
      },
      methods:{
        detailclick(index){
          this.currentIndex = index
          this.$emit('detailClick',index)

        },
        backclick(){
          this.$router.go(-1)
        }
      }
    }
</script>

<style scoped>
  .title{
    display: flex;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-tint);
  }
  .active2{
    color: var(--color-tint);
  }
  .back img{
    margin-top: 12px;
  }
</style>
