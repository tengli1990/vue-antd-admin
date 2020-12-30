import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import GlobalComponent from './components'
import './permission'
import '@assets/styles/global.less'

import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'

Vue.config.productionTip = false

Vue.use(GlobalComponent)
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
