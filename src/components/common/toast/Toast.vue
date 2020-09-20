<template>
    <div class="toast" v-show="show">
      <div>{{message}}</div>
    </div>
</template>

<script>
    export default {
      name: "Toast",
      props:{
        message:{
          type:String,
          detail:''
        },
        show:{
          type:Boolean,
          detail: false
        }
      }
    }
</script>

<style scoped>
  .toast{
    position: fixed;
    padding: 8px 10px;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    color: #fff;
    background: rgba(0,0,0,.7);
  }
</style>
