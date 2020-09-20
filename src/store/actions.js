export default {
  addCart(context,payload){
    return  new Promise(((resolve, reject) => {
      //查找数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 2.+1或者新添加
      if(oldProduct){
        // oldProduct.count += 1
        context.commit('addCounter',oldProduct)
        resolve('当前商品+1')
      }else{
        payload.count = 1
        // state.cartList.push(payload)
        context.commit('addToCart',payload)
        resolve('购物车数量+1')
      }
    }))
  }
}
