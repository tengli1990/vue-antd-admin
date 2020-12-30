import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import enUS from 'ant-design-vue/lib/locale-provider/en_US'

const app = {
  state: {
    locale: zhCN,
    sideCollapsed: false,
    isMobile: true
  },
  mutations: {
    LOCALE_US: (state) => {
      state.locale = enUS
    }
  },
  actions: {
    setLocaleUS ({ commit }) {
      commit('LOCALE_US')
    }
  }
}

export default app
