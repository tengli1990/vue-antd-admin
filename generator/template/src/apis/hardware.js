import request from '@/utils/request'
import { transformParams } from '@/utils'

/**
 * @module 硬件汇总相关API
 */

// 获取节点列表
export function getNodeList (data) {
  return request({
    url: '/astrology/node/search-or-list',
    method: 'POST',
    data
  })
}

// 获取绩点基本信息
export function getNodeBaseInfo (data) {
  return request({
    url: '/astrology/node/node-base-info',
    method: 'POST',
    data
  })
}

// 获取最近上数情况
export function getNodeStatusList (data) {
  return request({
    url: '/astrology/node/node-status-list',
    method: 'POST',
    data
  })
}

// 获取节点强度趋势
export function getNodeSignal (data) {
  return request({
    url: '/astrology/node/node-signal',
    method: 'POST',
    data
  })
}

// 下载数据
export function downloadNode (params) {
  params = transformParams(params)
  return `${process.env.VUE_APP_API_BASE_URL}/astrology/node/download?${params}`
}
