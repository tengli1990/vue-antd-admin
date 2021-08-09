import { asyncRoutes, constantRoutes } from '@/router/index'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  // 根据后端返回的 Access 对权限进行管理
  generateRoutesByAccess ({ commit }, access) {
    return new Promise(resolve => {
      let availableRoutes = []
      availableRoutes = fliterAsyncRoutesByAccess(asyncRoutes, access)

      commit('SET_ROUTES', availableRoutes)
      const defaultRoutes = filterDefaultRoutes(asyncRoutes)
      for (const item of defaultRoutes) {
        const { permissionId, path } = item
        if (access.includes(permissionId)) {
          availableRoutes.push(
            {
              path: '*', redirect: path, hidden: true, meta: { permission: true }
            }
          )
          break
        }
      }
      resolve(availableRoutes)
    })
  },

  // 开发用方法
  generateRoutes ({ commit }) {
    return new Promise(resolve => {
      const availableRoutes = []
      commit('SET_ROUTES', availableRoutes)
      resolve(availableRoutes)
    })
  }
}

// -------------------------------------------------------------------

/**
 * 递归过滤异步路由表， 返回符合用户 access 权限的路由表
 * @param {*} routes asyncRoutes
 * @param {*} access 用户访问权限
 */
export function fliterAsyncRoutesByAccess (routes, access) {
  const result = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasRouteAccess(access, tmp)) {
      if (tmp.children) {
        tmp.children = fliterAsyncRoutesByAccess(tmp.children, access)
      }
      result.push(tmp)
    }
  })

  return result
}

/**
 * 通过 路由的 mapping 关系判断是否有权访问
 * @param {*} access
 * @param {*} route
 */
function hasRouteAccess (access, route) {
  const hasAccess = access.find(item => route.meta.permission && route.meta.permission === item)
  if (hasAccess || route.meta.permission === true) {
    return true
  } else if (hasAccess === undefined) {
    return false
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutesByRoles (routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutesByRoles(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 获取默认重定向的页面
 */
function filterDefaultRoutes (routes) {
  let defaultRoutes = []
  const handleFn = (list) => {
    list.map(item => {
      const { children = [], meta = {}, path } = item
      if (meta.default || meta.default === 0) {
        defaultRoutes.push({ permissionId: meta.permission, path, index: Number(meta.default) })
      }
      if (children.length) {
        handleFn(children)
      }
    })
  }
  handleFn(routes)

  const compare = (property) => {
    return function (a, b) {
      return (a[property] - b[property])
    }
  }
  defaultRoutes = defaultRoutes.sort(compare('index'))
  return defaultRoutes
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
