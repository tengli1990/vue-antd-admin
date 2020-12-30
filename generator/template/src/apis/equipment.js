import request from '@utils/request'

/**
 * @module 设备管理
 */
// 获取设备列表
export function getEquipmentList (data) {
  return request({
    url: '/astrology/equipment/search-or-list',
    data,
    method: 'POST'
  })
}
