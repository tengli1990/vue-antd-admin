import Echarts from './Index.vue'

Echarts.install = function (Vue) {
  Vue.component(Echarts.name, Echarts)
}

export default Echarts
