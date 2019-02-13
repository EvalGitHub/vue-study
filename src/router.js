import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    { // 路由懒加载
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/vuex',
      name: 'vuex',
      component: ()=> import('./vuex/Vuex.vue'),
      children: [
        {
          path: '/',
          name: 'com01',
          component: () => import('./vuex/com01.vue')
        },
        {
          path: '/com02',
          name: 'com02',
          component: () => import('./vuex/com02.vue')
        },
      ]
    },
    {
      path: '/vueLazyLoad',
      name: 'vueLazyLoad',
      component: () => import('./components/VueLazyLoad.vue')
    }
  ]
})
