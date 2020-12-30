import router from '@/router/index'
import store from '@/store/index'
import NProgress from 'nprogress' // progress bar
import '@/assets/styles/nprogress.less' // progress bar custom style
import { setDocumentTitle, domTitle } from '@/utils'
import { getToken } from '@/utils/token'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 设置标题
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${domTitle} - ${to.meta.title}`))

  // 加载不需要验证登录和授权的页面
  if (to.meta.verification === false) {
    next()
    return
  }
  // 获取 token 信息
  const token = getToken()
  // // 获取 user 信息
  const user = store.getters.user
  // // 获取 user权限 信息
  const permissions = store.getters.permissions // ['dashboard-111', 'dashboard-222']
  if (token) {
    if (user != null && permissions != null) {
      next()
    } else {
      // 有 token 无 user 信息, 通常在登录后在页面刷新的情况, 通过getUserInfo拿user信息
      store.dispatch('user/getUserInfo', token).then(() => {
        store.dispatch('permission/generateRoutesByAccess', store.getters.permissions).then(routes => {
          router.addRoutes(routes) // 通过获取到的权限来动态添加路由
          next()
          router.replace(to)
        })
      })
    }
  } else {
    const currentRoute = document.URL.split(location.host)[1]
    next({
      path: '/user/login',
      query: {
        redirect: encodeURIComponent(currentRoute)
      }
    })
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
