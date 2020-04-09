import axios from 'axios'
import { Message, Notification } from 'element-ui'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: process.env.VUE_APP_TIMEOUT,
  get: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  },
  post: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})
const key = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIyODE3MzE5MSIsImlhdCI6MTU3MzU1Mzg1NiwianRpIjpmYWxzZSwiZGVjX2lzc2FsZXNjbGVyayI6ZmFsc2UsImRlY19zYWxlc2NsZXJrX2lkIjowfQ.Q0xiI7ADF9_Iq-vB_avxcqXWQcFLjQifmuoHpD_4-Kg'
// 添加请求拦截器
instance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  if (config.method === 'get') {
    config.params = {
      key: sessionStorage.getItem('dcKey') || key,
      ...config.params
    }
  }
  return config
}, error => {
  // 对请求错误做些什么
  Message({
    showClose: true,
    message: '请求超时',
    type: 'error'
  })
  return Promise.reject(error)
})
// 添加响应拦截器
instance.interceptors.response.use(response => {
  // 对响应数据做点什么
  if (!response.data) {
    return Promise.reject(response)
  }
  const { code, data, msg } = response.data
  switch (code) {
    case 1:
      return data
    default:
      Message({
        showClose: true,
        message: msg,
        type: 'error'
      })
      return Promise.reject(response)
  }
}, error => {
  // 对响应错误做点什么
  Notification({
    type: 'error',
    title: '提示',
    message: '系统错误',
    duration: 0
  })
  return Promise.reject(error)
})

export default instance
