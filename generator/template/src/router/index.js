import Vue from 'vue'
import Router from 'vue-router'
import { BasicLayout } from '@/components/layouts'

import UserRouter from './modules/user'
import IndexRouter from './modules/index'
import DemoRouter from '@router/modules/demo'

Vue.use(Router)

// 捕获并屏蔽报错
const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}

/**
 * 静态路由
 * @type { *[] }
 */
export const constantRoutes = [
  UserRouter,
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/fail/404')
  }

]

/**
 * asyncRoutes
 * 路由需要根据用户权限动态加载时，放在这里
 */
export const asyncRoutes = [
  {
    path: '/',
    name: 'IndexWelcome',
    component: BasicLayout,
    redirect: '/welcome',
    meta: {
      title: '首页',
      permission: true
    },
    children: [
      IndexRouter,
      DemoRouter
    ]
  }
]

const createRouter = () => new Router({
  /** https://router.vuejs.org/guide/advanced/scroll-behavior.html */
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes,
  mode: 'history'//! 注: 路由模式请勿在此处修改，若要修改请在/src/settings.js中进行修改
})

const router = createRouter()

// reset router
// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
