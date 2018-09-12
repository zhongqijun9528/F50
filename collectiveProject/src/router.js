import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'



import Login from "./components/login/login.vue"
import commodityManagement from "./components/commodityManagement/commodityManagement.vue"
import favouriteManagement from "./components/favouriteManagement/favouriteManagement.vue"
import serviceManagement from "./components/serviceManagement/serviceManagement.vue"
import storeManagement from "./components/storeManagement/storeManagement.vue"
import userManagement from "./components/userManagement/userManagement.vue"
import orderManagement from "./components/orderManagement/orderManagement.vue"


Vue.use(Router)
// Vue.use(Login)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/commodityManagement',
      name: 'commodityManagement',
      component: commodityManagement
    },
    {
      path: '/favouriteManagement',
      name: 'favouriteManagement',
      component: favouriteManagement
    },
    {
      path: '/serviceManagement',
      name: 'serviceManagement',
      component: serviceManagement
    },
    {
      path: '/storeManagement',
      name: 'storeManagement',
      component: storeManagement
    },
    {
      path: '/userManagement',
      name: 'userManagement',
      component: userManagement
    },
    {
      path: '/orderManagement',
      name: 'orderManagement',
      component: orderManagement
    },
  ]
})
