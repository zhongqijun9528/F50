import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'


import reg from "./components/login/reg.vue"
import plathome from "./components/login/plathome.vue"

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
      name: 'reg',
      component: reg
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/plathome',
      name: 'plathome',
      component: plathome,
      children:[{
        path:"/userManagement",
        name:"userManagement",
        component: userManagement,
      }]

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
      path: '/orderManagement',
      name: 'orderManagement',
      component: orderManagement
    },
  ]
})
