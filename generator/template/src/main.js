import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import GlobalComponent from './components'
import './permission'
import '@assets/styles/global.less'

import ProLayout from '@ant-design-vue/pro-layout'

Vue.config.productionTip = false

Vue.use(GlobalComponent)
// use pro-layout components
Vue.component('pro-layout', ProLayout)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
