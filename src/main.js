import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueLazyload from 'vue-lazyload'
import vMessage from './components/Toast/index' 

import EvelUI from 'evel-ui';

import './utils/registerComponent.js'
// or with options

Vue.use(ElementUI);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/errors.jpg'),
  loading: require('./assets/loading.gif'),
  attempt: 1,
  // listenEvents: [ 'scroll' ]
})
Vue.use(vMessage)

Vue.use(EvelUI) // 注册所有的样式组件

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
