import request from '@/utils/request'

/** @module 算法管理 */

// 获取算法列表
export function getAlgorithmList (data) {
  return request({
    url: '/astrology/algorithm/ai-code-list',
    method: 'POST',
    data
  })
}

// 新增算法代码
export function addAlgorithmCode (data) {
  return request({
    url: '/astrology/algorithm/add-code',
    method: 'POST',
    data
  })
}

// 修改备注
export function modifyAlgorithmRemark (data) {
  return request({
    url: '/astrology/algorithm/modify-remark',
    method: 'POST',
    data
  })
}

// 获取映射列表
export function getAlgorithmMappingList (data) {
  return request({
    url: '/astrology/algorithm/get-mapping-list',
    method: 'POST',
    data
  })
}

// 算法映射-按照节点串号
export function getAlgorithmMappingNodes (data) {
  return request({
    url: '/astrology/algorithm/mapping-nodes',
    method: 'POST',
    data
  })
}

// 算法映射-按照节点串号
export function getAlgorithmMappingType (data) {
  return request({
    url: '/astrology/algorithm/mapping-type',
    method: 'POST',
    data
  })
}

// 可映射节点列表
export function getAlgorithmNodeList (data) {
  return request({
    url: '/astrology/algorithm/get-node-list',
    method: 'POST',
    data
  })
}

// 删除映射
export function removeAlgorithmMapping (data) {
  return request({
    url: '/astrology/algorithm/remove-mapping',
    method: 'POST',
    data
  })
}
