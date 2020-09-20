import Toast from "./Toast";

const obj={}
obj.install = function (Vue) {
  // console.log('执行object')

  Vue.prototype.$toast = Toast
}

export default obj
