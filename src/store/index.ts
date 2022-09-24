import Vue from "vue";
import Vuex from "vuex";
import pokemon from "./modules/pokemon";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: { pokemon },
});
