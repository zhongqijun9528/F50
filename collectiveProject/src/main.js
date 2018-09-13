import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import App from './App.vue'
import router from './router'
import store from './store'
import login from './components/login/login'
import favouriteManagement from './components/favouriteManagement/favouriteManagement'
import commodityManagement from './components/commodityManagement/commodityManagement'
import storeHead from "./components/storeManagement/storeHead.vue"
import serviceManagement from './components/serviceManagement/serviceManagement'
import storeManagement from './components/storeManagement/storeManagement'
import userManagement from './components/userManagement/userManagement'
import orderManagement from './components/orderManagement/orderManagement'

// 服务管理
import addService from "./components/serviceManagement/addService";
Vue.component('addService',addService);

Vue.component('login',login)
Vue.component('favouriteManagement',favouriteManagement)
Vue.component('commodityManagement',commodityManagement)
Vue.component('serviceManagement',serviceManagement)
Vue.component('storeManagement',storeManagement)
Vue.component('userManagement',userManagement)
Vue.component('orderManagement',orderManagement)

// 门店管理组件
Vue.component('storeHead',storeHead)



Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
