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
const webpack = require('webpack');
module.exports = {
  configureWebpack: {
    plugins: [
        new webpack.DefinePlugin({
           'process.env.NODE_ENV':  'production'
        })
    ]
  }
};