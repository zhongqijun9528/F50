import Vue from 'vue'
import Vuex from 'vuex'
import orderManagement from './components/orderManagement/store'
import service from "./components/serviceManagement/store";
<<<<<<< HEAD
import reg from "./components/login/store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    service,reg
=======
import storeManagement from "./components/storeManagement/store.js"
Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    orderManagement,
    service,
    storeManagement
>>>>>>> 4d2fd3b8f6f19980e5b93bd7bd62c01339719cf2
  }
})