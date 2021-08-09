import { login, logout, getUserInfo } from '@/apis/user'
import defaultPermissions from '@/config/defaultPermissions'
import {
  getToken,
  setToken,
  removeToken,
  setUser,
  removeUser
} from '@/utils/token'

const state = {
  token: getToken(),
  user: null,
  roles: [],
  permissions: null
}

const mutations = {
  // 将 token 信息存入 cookie
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  // 将用户信息存入 localStorage
  SET_USER: (state, user) => {
    state.user = user
    setUser(user)
  },
  // 设置用户角色
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  // 设置用户权限
  SET_PERMISSIONS: (state, permissions) => {
    state.permissions = permissions
  }
}

const actions = {
  // 通过使用 ticket 进行登录
  handleLogin ({ commit }, paramter) {
    return new Promise((resolve, reject) => {
      login(paramter).then(res => {
        if (res.code !== '0000') {
          // message.error(res.msg)
          resolve(res)
          return
        }
        const { token } = res.data
        // 设置 token
        commit('SET_TOKEN', token)

        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 退出登录
  handleLogout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(data => {
        // 清除 Cookie 中的 token
        removeToken()
        removeUser()
        commit('SET_USER', null)
        // 跳转sso
        // redirectToSSOPage()
        // window.location.reload()
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },
  // 获取用户信息
  getUserInfo ({ commit, dispatch, state }) {
    return new Promise((resolve, reject) => {
      const token = getToken()
      getUserInfo(token).then(res => {
        const data = res.data
        // 操作用户信息
        commit('SET_USER', data)
        // if (store.getters.waterMark) { // 判断是否开启水印
        //   buildWaterMark({ content: data.name + ' ' + data.userId }) // 水印内容为name + userId，可根据需要进行修改
        // }
        const rolePermissionsList = data.resources.concat(defaultPermissions)
        window.localStorage.setItem('ROLE_PERMISSIONS_LIST', JSON.stringify(rolePermissionsList))
        // 操作用户信息
        commit('SET_PERMISSIONS', rolePermissionsList)
        resolve(data)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // 重置本地 token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
