import PageHeaderWrapper from './Index.vue'

PageHeaderWrapper.install = function (Vue) {
  Vue.component(PageHeaderWrapper.name, PageHeaderWrapper)
}

export default PageHeaderWrapper
