import request from '@utils/request'

/**
 * @module 角色管理
 */
// 获取角色列表
export function getRoleList (data) {
  return request({
    url: '/astrology/role/search-or-list',
    data,
    method: 'POST'
  })
}

// 获取角色列表不分页
export function getRoleListAll (data) {
  return request({
    url: '/astrology/role/list-all',
    data,
    method: 'POST'
  })
}

// 获取角色列表
export function getRoleDetail (data) {
  return request({
    url: '/astrology/role/role-detail',
    data,
    method: 'POST'
  })
}

// 添加角色
export function addRole (data) {
  return request({
    url: '/astrology/role/add',
    data,
    method: 'POST'
  })
}

// 修改角色
export function modifyRole (data) {
  return request({
    url: '/astrology/role/modify',
    data,
    method: 'POST'
  })
}

// 修改角色
export function deleteRole (data) {
  return request({
    url: '/astrology/role/delete',
    data,
    method: 'POST'
  })
}

/**
 * @module 部门管理
 */

export function getDepartmentList (data) {
  return request({
    url: '/astrology/department/search-or-list',
    data,
    method: 'POST'
  })
}

export function addDepartment (data) {
  return request({
    url: '/astrology/department/add',
    data,
    method: 'POST'
  })
}

export function modifyDepartment (data) {
  return request({
    url: '/astrology/department/modify',
    data,
    method: 'POST'
  })
}

export function deleteDepartment (data) {
  return request({
    url: '/astrology/department/delete',
    data,
    method: 'POST'
  })
}

export function getDepartmentListAll (data) {
  return request({
    url: '/astrology/department/list-all',
    data,
    method: 'POST'
  })
}

/**
 * @module 用户管理
 */

/**
 * 获取用户列表
 */
export function getUserList (data) {
  return request({
    url: '/astrology/user/list',
    method: 'POST',
    data
  })
}

/**
 * 获取用户角色列表
 */
export function getUserRoleList (data) {
  return request({
    url: '/astrology/user/role-list',
    method: 'POST',
    data
  })
}

// 添加用户
export function addUser (data) {
  return request({
    url: '/astrology/user/add',
    method: 'POST',
    data
  })
}

// 修改用户信息
export function modifyUser (data) {
  return request({
    url: '/astrology/user/update',
    method: 'POST',
    data
  })
}

// 删除用户
//
export function deleteUser (data) {
  return request({
    url: '/astrology/user/delete',
    method: 'POST',
    data
  })
}

// 重置用户密码
export function resetPassword (data) {
  return request({
    url: '/astrology/user/reset-password',
    method: 'POST',
    data
  })
}
