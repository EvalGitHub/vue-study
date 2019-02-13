import axios from 'axios'

// TODO: 请求期间的处理，拦截器

axios.interceptors.request.use(function (config) {
  // 在发送请求之前
  
  return config
}, function (error) {
  // 对请求错误
  
  return Promise.reject(error)
})

// response 拦截器
axios.interceptors.response.use(res => {
  
  return res
}, err => {
  
  return Promise.reject(err)
})


export default axios