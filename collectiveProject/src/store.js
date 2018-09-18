import Vue from 'vue'
import Vuex from 'vuex'
import orderManagement from './components/orderManagement/store'
import service from "./components/serviceManagement/store";
import reg from "./components/login/store";
import storeManagement from "./components/storeManagement/store.js"
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    service,reg,
    orderManagement,
    storeManagement
  }
})