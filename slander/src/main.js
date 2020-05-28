import Vue from 'vue'
import App from './App.vue'


import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas,fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false

import VueRouter from 'vue-router'

Vue.use(VueRouter)
const router = new VueRouter({ 

});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')