import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import login from './components/login/login'
import favouriteManagement from './components/favouriteManagement/favouriteManagement'
import commodityManagement from './components/commodityManagement/commodityManagement'
import serviceManagement from './components/serviceManagement/serviceManagement'
import storeManagement from './components/storeManagement/storeManagement'
import userManagement from './components/userManagement/userManagement'
import orderManagement from './components/orderManagement/orderManagement'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

Vue.component('login',login)
Vue.component('favouriteManagement',favouriteManagement)
Vue.component('commodityManagement',commodityManagement)
Vue.component('serviceManagement',serviceManagement)
Vue.component('storeManagement',storeManagement)
Vue.component('userManagement',userManagement)
Vue.component('orderManagement',orderManagement)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
