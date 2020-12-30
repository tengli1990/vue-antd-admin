import request from '@utils/request'

const baseURL = process.env.VUE_APP_API_BASE_URL_TREND
/**
 * @module 图谱
 */
export function getSpectrum (data) {
  return request({
    baseURL,
    url: '/astrology/feature/acceleration/get-spectrum',
    data,
    method: 'POST'
  })
}
