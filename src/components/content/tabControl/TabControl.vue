<template>
  <div class="tab-control">
    <div v-for="(item,index) in title"
         class="tab-control-item"
         :class="{ active: index === currentindex}" @click="controlclick(index)" >
    <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
    export default {
      name: "TabControl",
      props:{
          title:{
            type:Array,
            default(){
              return[]
            }
          }
        },
      data(){
        return {
          currentindex:0
        }
      },
      methods:{
        controlclick(index){
          this.currentindex = index
          this.$emit('tabclick',index)
        }
      }
    }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
