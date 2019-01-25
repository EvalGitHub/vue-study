import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleA = {
  namespaced: true,
  strick: process.env.NODE_ENV !== 'production',
  devtools: false,
  state : () => {
    return {
      count:0,
      name:'tomJack',
      age:32,
      phone: 13712553098
    }
  },
  mutations: {
    increment (state) {
      state.count++
    },
    decrement (state, payload) {
      state.count -= (payload && payload.amount? payload.amount: 1);
    },
    updatePhone (state, payload) {
      state.phone = payload.phone
    }
  },
  getters: {
    upperName: state => {
      return  typeof (state.name) === 'string' ? state.name.toUpperCase() : '非字符串'
    }
  },
  actions: {
    decrementAsync ({commit},{amount}) { // 与 store 实例具有相同方法和属性的 context 对象
      commit('decrement')
      setTimeout(() => {
        commit('decrement',{amount})
      }, 1000)
    }
  }
}

export default new Vuex.Store({
  modules: {
    a: moduleA
  }
})
