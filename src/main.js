import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyload from "vue-lazyload";

Vue.prototype.$bus = new Vue()

Vue.use(VueLazyload,{
  loading:require('assets/img/common/placeholder.png')
})
FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
