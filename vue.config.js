// const path = require('path')
// const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
// module.exports = {
//   // 选项...
//   configureWebpack: {
//     target: 'node',
//     entry: path.join(__dirname, '../src/skeleton-entry.js'),
//     outputDir: {
//       filename: 'server.bundle.js',
//       path: path.join(__dirname, '../server-dist'),
//       libraryTarget: 'commonjs2'
//     },
//     plugins: [
//       new VueSSRServerPlugin({filename: 'skeleton.json'})
//     ]
//   }
// }
const { SkeletonPlugin } = require('page-skeleton-webpack-plugin')
const webpack = require('webpack');
var path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
module.exports = {
  configureWebpack: {
    plugins: [
        new webpack.DefinePlugin({
           'process.env.NODE_ENV':  'production'
        }),
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          routes: [ '/', '/about', '/vuex' ],
    
          // renderer: new Renderer({
          //   inject: {
          //     foo: 'bar'
          //   },
          //   headless: true,
          //   renderAfterDocumentEvent: 'render-event'
          // })
        }),
        new SkeletonPlugin({
          pathname: path.resolve(__dirname, './shell'), // 用来存储 shell 文件的地址
          staticDir: path.resolve(__dirname, './dist'), // 最好和 `output.path` 相同
          routes: ['/','/about', '/vuex'], // 将需要生成骨架屏的路由添加到数组中
          // excludes: ['.van-nav-bar', '.van-tabbar']  // 需要忽略的css选择器
        })
       
    ],
    
  },
  chainWebpack: (config) => {   // 解决vue-cli3脚手架创建的项目压缩html 干掉<!-- shell -->导致骨架屏不生效
    if (process.env.NODE_ENV !== 'development') {
      config.plugin('html').tap(opts => {
      opts[0].minify.removeComments = false
      return opts
    })
  }}
};