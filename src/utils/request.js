import axios from 'axios'
axios.create({
  baseURL: 'baseURL',
  timeout: 'timeout',
  headers: 'headers'
})
axios.interceptors.request.use(config => {
// Do something before request is sent
  return config
}, error => {
// Do something with request error
  return Promise.reject(error)
})
axios.interceptors.response.use(response => {
// Do something before response is sent
  return response
}, error => {
// Do something with response error
  return Promise.reject(error)
})

