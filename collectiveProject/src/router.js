import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

import Login from "./components/login/login.vue";
import commodityManagement from "./components/commodityManagement/commodityManagement.vue";
import favouriteManagement from "./components/favouriteManagement/favouriteManagement.vue";
import serviceManagement from "./components/serviceManagement/serviceManagement.vue";
import storeManagement from "./components/storeManagement/storeManagement.vue";
import userManagement from "./components/userManagement/userManagement.vue";
import orderManagement from "./components/orderManagement/orderManagement.vue";

import reg from "./components/login/reg.vue"
import plathome from "./components/login/plathome.vue"
import storehome from "./components/login/storehome.vue"



Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: reg
    },
    {
      path: '/storehome',
      name: 'storehome',
      component: storehome
    },
    {
      path: '/plathome',
      name: 'plathome',
      component: plathome,
      children:[{
        path:"/userManagement",
        name:"userManagement",
        component: userManagement,
      },
      {
        path: "/favouriteManagement",
        name: "favouriteManagement",
        component: favouriteManagement
      },]
    },

    {
      path: '/storehome',
      name: 'storehome',
      component: storehome,
      children:[
        {
          path: "/commodityManagement",
          name: "commodityManagement",
          component: commodityManagement
        },
        
        {
          path: "/serviceManagement",
          name: "serviceManagement",
          component: serviceManagement
        },
        {
          path: "/storeManagement",
          name: "storeManagement",
          component: storeManagement
        },
        {
          path: "/orderManagement",
          name: "orderManagement",
          component: orderManagement
        }
      ]
    },
   
    // {
    //   path: "/userManagement",
    //   name: "userManagement",
    //   component: userManagement
    // },
    
  ]
});
