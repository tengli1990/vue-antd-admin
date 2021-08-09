import request from '@/utils/request'

// 获取部门以及角色列表
/** 用户登录 */
export function login (data) {
  return new Promise(function (resolve, reject) {
    resolve({
      code: '0000',
      msg: 'success',
      data: {
        id: 'd5b8c0fb-4362-4092-8c28-e0947fe8f0ca',
        name: 'Pi2Star',
        token: '0FAC798E78A61B8C1AF185C3326221BE',
        username: 'service_manager@pi2star.com'
      }
    })
  })
  // return request({
  //   url: '/astrology/user/login',
  //   data,
  //   method: 'POST'
  // })
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
  return new Promise((resolve, reject) => {
    resolve(
      {
        code: '0000',
        msg: 'success',
        data: {
          id: 'd5b8c0fb-4362-4092-8c28-e0947fe8f0ca',
          name: 'Pi2Star',
          username: 'service_manager@pi2star.com',
          email: 'service_manager@pi2star.com',
          mobile: '15810660233',
          token: '0FAC798E78A61B8C1AF185C3326221BE',
          department: '软件部',
          departmentId: 'e7a0f800-e9bc-4719-9235-6e4ac34e3cf3',
          isEnable: true,
          createdAt: '2021-01-11T03:54:28.140+0000',
          resources: [],
          isAdmin: false
        }
      })
  })
  // return request({
  //   url: '/astrology/user/user-detail',
  //   method: 'POST'
  // })
}

/** 修改密码 */
export function modifyPassword (data) {
  return request({
    url: '/astrology/user/modify-password',
    method: 'POST',
    data
  })
}
