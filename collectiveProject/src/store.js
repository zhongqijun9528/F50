import Vue from "vue";
import Vuex from "vuex";
import service from "./components/serviceManagement/store";
import reg from "./components/login/store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    service,reg
  }
});
