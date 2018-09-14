import Vue from 'vue'
import Vuex from 'vuex'
import orderManagement from './components/orderManagement/store'
import service from "./components/serviceManagement/store";
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    orderManagement,
    service
  }
})


