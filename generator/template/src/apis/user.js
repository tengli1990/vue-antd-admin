import request from '@/utils/request'

// 获取部门以及角色列表
export { getDepartmentListAll, getRoleListAll } from './account'

/** 用户登录 */
export function login (data) {
  return request({
    url: '/astrology/user/login',
    data,
    method: 'POST'
  })
}

/** 用户登出 */
export function logout (token) {
  return new Promise((resolve, reject) => {
    resolve({
      code: 0,
      message: '成功'
    })
  })
}

/** 获取用户信息 */
export function getUserInfo () {
  // return new Promise((resolve, reject) => {
  //   resolve({
  //     code: '0000',
  //     msg: '',
  //     data: {
  //       name: '李腾',
  //       resources: []
  //     }
  //   })
  // })
  return request({
    url: '/astrology/user/user-detail',
    method: 'POST'
  })
}

/** 修改密码 */
export function modifyPassword (data) {
  return request({
    url: '/astrology/user/modify-password',
    method: 'POST',
    data
  })
}
