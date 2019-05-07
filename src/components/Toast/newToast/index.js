import Toast from './Toast'
const SelfToast = function () {
  this.duration = 2000
  this.animateTime = 300
  this.install = (Vue) => {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component("Toast", Toast)
    const msgFun = (type, text, callBack) => {
      let msg
      let duration = this.duration
      let animateTime = this.animateTime
      if (typeof text === 'string') {
        msg = text
      } else if (text instanceof Object) {
        msg = text.text || ''
        if (text.duration) {
          duration = text.duration
        }
        if (text.animateTime) {
          animateTime = text.animateTime
        }
      }
      let VueMessage = Vue.extend({
        render(h) {
          let props = {
            type,
            text: msg,
            show: this.show
          }
          return h('Toast', {props}) 
        },
        data() {
          return {
            show: false
          }
        }
      })
      let newMessage = new VueMessage()
      let vm = newMessage.$mount()
      let el = vm.$el
      document.body.appendChild(el) 
      vm.show = true
      let t1 = setTimeout(() => {
        t1 && clearTimeout(t1)
        vm.show = false  
        let t2 = setTimeout(() => {
          t2 && clearTimeout(t2)
          document.body.removeChild(el) 
          newMessage.$destroy()
          vm = null
          callBack && (typeof callBack === 'function') && callBack() 
        }, animateTime)
      }, duration)
    }

    // 挂载到vue原型上，暴露四个方法
    Vue.prototype.$message = {
      info(text, callBack) {
        if (!text) return
        msgFun('info', text, callBack)
      },
      success(text, callBack) {
        if (!text) return
        msgFun('success', text, callBack)
      },
      error(text, callBack) {
        if (!text) return
        msgFun('error', text, callBack)
      },
      warning(text, callBack) {
        if (!text) return
        msgFun('warning', text, callBack)
      }
    }
  }
}

export default SelfToast