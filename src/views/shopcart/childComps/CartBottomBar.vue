<template>
<div class="bottom-bar">
  <div class="checke-content">
    <check-button class="checke-buttom" :is-checked="isSelectAll" @click.native="checkclick" />
    <span>全选</span>
  </div>
  <div class="price">
    合计:{{totalPrice}}
  </div>
  <div class="calculate" @click="calcClick">
    去计算:{{checkLength}}
  </div>
</div>
</template>

<script>
  import CheckButton from "components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'
    export default {
      name: "CartBottomBar",
      components:{
        CheckButton
      },
      computed:{
        ...mapGetters(['cartList']),
        totalPrice(){
            return this.$store.getters.cartList.filter(item=>{
            return item.checked
          }).reduce((preValue, item) => {
              return preValue + item.count * item.newPrice
            }, 0).toFixed(2)
        },
        //判断 去计算 长度
        checkLength(){
          return this.$store.state.cartList.filter(item=> item.checked).length
        },
        //判断全选
        isSelectAll(){
          //判断 刷新为空 false
          if (this.cartList.length === 0) return false
            //第二种写法
          return !this.cartList.find(item=> !item.checked)
          //普通遍历写法
          // for (let item of this.cartList){
          //   if (!item.checked){
          //     return false
          //   }
          // }
          // return true
        }
      },
      methods:{
        //判断点击全选 全不选
        checkclick(){
          //判断isSelectAll 是否全选
          if (this.isSelectAll){
            this.cartList.forEach(item=>item.checked = false)
          }else {
            this.cartList.forEach(item=>item.checked = true)
          }
        },
        calcClick(){
          // console.log('---')

        }
      }
    }
</script>

<style scoped>
.bottom-bar{
  display: flex;
  height: 40px;
  background-color: pink;
  position: relative;
  bottom: 40px;
  line-height: 40px;
}
  .checke-content{
    display: flex;
    align-items: center;
    width: 60px;
  }

  .checke-buttom{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price{
    margin-left: 10px;
    flex: 1;
  }
  .calculate{
    width: 90px;
    background: red;
    color: #ffffff;
    text-align: center;
  }
</style>
