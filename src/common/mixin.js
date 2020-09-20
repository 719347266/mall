import {debouce} from './utils'
export const itemListenerMixn = {
  mounted(){
    let refresh = debouce(this.$refs.scroll.refresh,50)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImgaLoad',this.itemImgListener)
    console.log('我是混入');
  }
}
