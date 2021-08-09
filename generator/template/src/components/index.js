import CommonJs from '@/utils/common'
/**
 * @module antd组件
 */
import {
  notification,
  message,
  ConfigProvider,
  Layout,
  Menu,
  Drawer,
  Modal,
  Icon,
  Dropdown,
  Avatar,
  Spin,
  Result,
  FormModel,
  Input,
  InputNumber,
  Button,
  Table,
  Divider,
  Tag,
  Form,
  Select,
  DatePicker,
  Pagination,
  PageHeader,
  Space,
  Tabs,
  Tooltip,
  Badge,
  Row,
  Col,
  Statistic,
  Popconfirm,
  Descriptions,
  Checkbox,
  Cascader
} from 'ant-design-vue'

/**
 * @module 第三方插件
 */
<%_ if (options.echarts) { _%>
import * as echarts from 'echarts'
<%_ } _%>
/**
 * @module 自定义组件
 */
import ConditionQuery from './conditionQuery'
<%_ if (options.echarts) { _%>
import Echarts from './echarts'
<%_ } _%>
import Toast from './toast'
import PageHeaderWrapper from './pageHeaderWrapper'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2248787_kcp707s15z.js'
})
// antd 组件列表
const antdComponents = [
  ConfigProvider,
  Layout,
  Menu,
  Drawer,
  Modal,
  Dropdown,
  Avatar,
  Spin,
  Result,
  FormModel,
  Input,
  InputNumber,
  Button,
  Table,
  Divider,
  Tag,
  Form,
  Select,
  DatePicker,
  Pagination,
  PageHeader,
  Space,
  Tabs,
  Tooltip,
  Badge,
  Row,
  Col,
  Statistic,
  Popconfirm,
  Descriptions,
  Checkbox,
  Cascader,
  Icon
]

// 自定义组件列表
const components = [
  <%_ if (options.echarts) { _%>
  Echarts,
  <%_ } _%>
  ConditionQuery,
  PageHeaderWrapper
]

function install (Vue) {
  if (install.installed) {
    return
  }
  install.installed = true
  components.forEach(Component => {
    Component.install(Vue)
  })

  antdComponents.forEach(Component => {
    Vue.use(Component)
  })

  Vue.component('icon-font', IconFont)

  // 绑定全局方法 通过 this.$confirm()方式调用
  for (const key in CommonJs) {
    Vue.prototype[key] = CommonJs[key]
  }
  Vue.prototype.$confirm = Modal.confirm
  Vue.prototype.$message = message
  Vue.prototype.$notification = notification
  Vue.prototype.$info = Modal.info
  Vue.prototype.$success = Modal.success
  Vue.prototype.$error = Modal.error
  Vue.prototype.$warning = Modal.warning
  <%_ if (options.echarts) { _%>
  Vue.prototype.$echarts = echarts
  <%_ } _%>
  Vue.prototype.$toast = Toast
}

const GlobalComponent = {
  /* eslint-disable no-undef */
  install
}
components.forEach((Component) => {
  const name = Component.name
  if (name) {
    GlobalComponent[name] = Component
  }
})

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default GlobalComponent
