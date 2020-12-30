import request from '@utils/request'

/**
 * @module 标签管理
 */
// 获取标签管理列表
export function getLabelList (data) {
  return request({
    url: '/astrology/label/node-search-or-list',
    data,
    method: 'POST'
  })
}

export function getLabelDetail (data) {
  return request({
    url: '/astrology/label/detail-list',
    data,
    method: 'POST'
  })
}

export function addBatch (data) {
  return request({
    url: '/astrology/label/add-batch',
    data,
    method: 'POST'
  })
}
