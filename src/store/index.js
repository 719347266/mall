import Vue from 'vue'
import Vuex from 'vuex'
import modules from "./modules";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(Vuex)

const state = {
    cartList:[]
  }
export default new Vuex.Store({
  getters,
  state,
  mutations,
  actions,
  modules
})
