import axios from 'axios'
import store from '@/store'
import router from '@/router'
import {
  Message
} from 'element-ui'

// 创建一个新的axios实例
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 添加请求拦截器
request.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  const token = store.getters.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 添加响应拦截器
request.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  const { success, message } = response.data
  console.log(response.data)
  //   要根据success的成功与否决定下面的操作
  if (success) {
    return response.data
  } else {
    return Promise.reject(new Error(Message.error(message)))
  }
}, function(error) {
  if (error.response.status === 401) {
    store.dispatch('user/logout')
    router.push('/login')
  }
  return Promise.reject(error)
})

export default request
