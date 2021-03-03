/**
 * require 模块的解释
 * @ https://www.jianshu.com/p/c894ea00dfec 
 * */
import Vue from 'vue'

/**
 * 首字母大写
 * @param str 字符串
 * @example heheHaha
 * @return {string} HeheHaha
 */
function capitalizeFirstLetter (str) {
  return str.charAt(0).toUpperCase() + str.slice(1) 
}
/**
 * 对符合'xx/xx.vue'组件格式的组件取组件名
 * @param str fileName
 * @example abc/bcd/def/basicTable.vue
 * @return {string} BasicTable
 */
function validateFileName (str) {
  //console.log("组件路径", str)
  return /^\S+\.vue$/.test(str) &&
    str.replace(/^\S+\/(\w+)\.vue$/, (rs, $1) => {
      /**
       * @url https://blog.csdn.net/honglei_zh/article/details/52593482
       * @param rs：匹配的结果
       * @param $1: 第一个（）提取的结果
       * @param $2: 第2个（）提取的结果
       * */
      return capitalizeFirstLetter($1)})
}
const requireComponent = require.context('../components', true, /\.vue$/)

// 找到组件文件夹下以.vue命名的文件，如果文件名为index，那么取组件中的name作为注册的组件名
console.log('requireComponent.keys()', requireComponent.keys());
requireComponent.keys().forEach(filePath => {
  const componentConfig = requireComponent(filePath) // 组件的内容
  const fileName = validateFileName(filePath) 
  const componentName = fileName.toLowerCase() === 'index'
    ? capitalizeFirstLetter(componentConfig.default.name)
    : fileName
  Vue.component(componentName, componentConfig.default || componentConfig)
})
 