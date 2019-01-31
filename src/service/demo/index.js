import serObj from './serveUrl'
import axios from '../index'
// 模块api函数
/* eslint-disable */
const funObj = {
  getImgsFun: () => {
    const url = serObj.urlList.demo.getImgs
    return axios.get(url)
  }
}
export default funObj