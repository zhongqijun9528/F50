import Vue from 'vue'
import Vuex from 'vuex'
import orderManagement from './components/orderManagement/store'
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    orderManagement
  }
})