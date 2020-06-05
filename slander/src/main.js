import Vue from 'vue'
import App from './App.vue'
import routes from './router/index.js';

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


import { Slide } from 'vue-burger-menu'
Vue.component('slide', Slide);
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas,fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import axios from 'axios' 
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios) //追記

Vue.config.productionTip = false

import VueRouter from 'vue-router'
import VueAnalytics from 'vue-analytics'

Vue.use(VueRouter)
const router = new VueRouter({ 
  routes,
});

Vue.use(VueAnalytics, {
  id: 'UA-93515507-20',
  router
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')