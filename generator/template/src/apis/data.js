import request from '@utils/request'

/**
 * @module 数据同步
 */
// 获取系统汇总
export function getDataSyncSummary (data) {
  return request({
    url: '/astrology/data-sync/summary',
    data,
    method: 'POST'
  })
}

// 获取系统列表
export function getDataSyncList (data) {
  return request({
    url: '/astrology/data-sync/list',
    data,
    method: 'POST'
  })
}

// 手动同步
export function dataSync (data) {
  return request({
    url: '/astrology/data-sync/data-sync',
    data,
    method: 'POST'
  })
}
