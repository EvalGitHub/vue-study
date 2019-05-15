import axios from 'axios'

axios.defaults.retry = 4
axios.defaults.retryDelay = 1000

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

/*** 
 * 超时重新发送
 * 原理：响应超时之后会触发响应拦拦截器的第二个回调函数，error是一个对象，里面包含config字段就是请求相关的配置项【methods, url, data】
 *      因此可以在这个回调函数中做相关处理（定时重新请求）
 * */
axios.interceptors.response.use(undefined, (err) => {
  var config = err.config;
  // If config does not exist or the retry option is not set, reject
  if(!config || !config.retry) return Promise.reject(err);
  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0;
  // Check if we've maxed out the total number of retries
  if(config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err);
  }
  // Increase the retry count
  config.__retryCount += 1;
  // Create new promise to handle exponential backoff
  var backoff = new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, config.retryDelay || 1);
  });
  // Return the promise in which recalls axios to retry the request
  return backoff.then(function() {
    return axios(config);
  });
})


export default axios