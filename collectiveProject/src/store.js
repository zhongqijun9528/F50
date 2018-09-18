import Vue from 'vue'
import Vuex from 'vuex'
import orderManagement from './components/orderManagement/store'
import service from "./components/serviceManagement/store";
import reg from "./components/login/store";
import storeManagement from "./components/storeManagement/store.js"
import favouriteManagement from "./components/favouriteManagement/store"
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    reg,
    service,
    orderManagement,
    storeManagement,
    favouriteManagement
  }
})
