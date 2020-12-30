import axios from 'axios'
import store from '@/store'
import notification from 'ant-design-vue/es/notification'
import router from '@/router'
import { getToken } from '@/utils/token'
import * as statusCode from '@/assets/statusCode.json'

// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  console.log(error, error.response)

  if (!error.response) {
    // TODO: 是否需要换成确认框重新刷新的操作
    notification.error({
      message: '请求超时',
      description: `${error.toString()}`
    })
    return Promise.reject(error)
  }
  const data = error.response.data
  // 从 localstorage 获取 token
  const token = getToken()
  const statusCode = error.response.status

  switch (statusCode) {
    case 403:
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
      break
    case 401:
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      if (token) {
        store.dispatch('user/handleLogout').then(() => {
          setTimeout(() => {
            router.replace('/user/login')
          }, 1500)
        })
      }
      break
    default :
      notification.error({
        message: '接口请求错误',
        description: `状态码${statusCode || error.toString()}`
      })
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use(config => {
  const token = getToken()
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers['token'] = token
  }
  return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response) => {
  const { data } = response
  if (data.code !== '0000') {
    data.msg = statusCode.code[data.code] || data.msg
  }
  return response.data
}, errorHandler)

export default request
